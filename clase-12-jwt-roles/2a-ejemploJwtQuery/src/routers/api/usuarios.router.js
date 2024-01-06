import { Router } from 'express'
import { getTokenFromQuery } from '../../middlewares/tokens.js'
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

  // BODY //
  // aca tb el cliente tiene que extraer y guardar el token por su cuenta, por ejemplo, usando LocalStorage 
  res.status(201).json({ status: 'success', payload: usuario, accessToken })
})

usuariosRouter.get('/current',
  getTokenFromQuery('t'),
  authenticate,
  (req, res) => {
    res.json(req['user'])
  })
