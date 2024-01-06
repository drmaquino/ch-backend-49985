import { Router } from 'express'
import { usuariosManager } from '../../models/Usuario.js'
import { encriptar } from '../../utils/criptografia.js'

const COOKIE_OPTS = {
  signed: true,
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
}

export const sesionesRouter = Router()

sesionesRouter.post('/', async (req, res) => {

  const { username, password } = req.body

  const usuario = await usuariosManager.authenticate(username, password)
  if (!usuario) {
    return res.status(401).json({ status: 'error', message: 'login failed' })
  }

  console.log('logueado!')
  console.log(JSON.stringify(usuario))

  const accessToken = await encriptar(usuario)

  // COOKIES //
  // en este caso, queda en la cookie, no tiene que hacer nada el cliente
  // luego el servidor tiene que extraer el token de la cookie
  // precisa del middleware cookie-parser
  res.cookie('authorization', accessToken, COOKIE_OPTS)
  res.status(201).json({ status: 'success', payload: usuario })
})

sesionesRouter.delete('/current', (req, res) => {
  res.clearCookie('authorization', COOKIE_OPTS)
  res.sendStatus(204)
})