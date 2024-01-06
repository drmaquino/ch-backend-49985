import { Router } from 'express'
import { getTokenFromSignedCookies } from '../../middlewares/tokens.js'
import { usuariosManager } from '../../models/Usuario.js'
import { encriptar } from '../../utils/criptografia.js'
import { authenticate } from '../../middlewares/authentication.js'

export const usuariosRouter = Router()

usuariosRouter.post('/', async (req, res) => {

  const { username } = req.body

  const yaExiste = await usuariosManager.findByUsername(username)
  if (yaExiste) {
    return res.status(409).json({ error: 'ya existe ese usuario' })
  }

  const usuario = await usuariosManager.insertOne(req.body)

  console.log('registrado!')
  console.log(JSON.stringify(usuario))

  const accessToken = await encriptar(usuario)

  // COOKIES //
  // en este caso, queda en la cookie, no tiene que hacer nada el cliente
  // luego el servidor tiene que extraer el token de la cookie
  // precisa del middleware cookie-parser
  res.cookie('authorization', accessToken, {
    signed: true,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  })
  res.status(201).json({ status: 'success', payload: usuario })
})

usuariosRouter.get('/current',
  getTokenFromSignedCookies(),
  authenticate,
  (req, res) => {
    res.json(req['user'])
  })
