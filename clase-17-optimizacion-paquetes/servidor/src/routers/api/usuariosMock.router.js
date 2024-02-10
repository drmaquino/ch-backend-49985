import { Router } from 'express'
import { UsuariosDaoMock } from '../../daos/usuarios/mock/usuarios.dao.mock.js'

const usuariosDaoMock = new UsuariosDaoMock()

export const usuariosMockRouter = Router()

usuariosMockRouter.get('/', async (req, res) => {
  res.json(await usuariosDaoMock.readMany())
})