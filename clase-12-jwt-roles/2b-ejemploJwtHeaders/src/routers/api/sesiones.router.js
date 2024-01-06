import { Router } from 'express'
import { usuariosManager } from '../../models/Usuario.js'
import { encriptar } from '../../utils/criptografia.js'

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

  // HEADERS //
  // acá el cliente tiene que extraer y guardar el token por su cuenta, por ejemplo, usando LocalStorage 
  res.header('authorization', accessToken)
  res.status(201).json({ status: 'success', payload: usuario })
})