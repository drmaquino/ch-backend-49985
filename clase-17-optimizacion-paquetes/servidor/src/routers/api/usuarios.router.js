import { Router } from 'express'
import { deleteController, postController } from '../../controllers/usuarios.controller.js'

export const usuariosRouter = Router()

usuariosRouter.post('/', postController)
usuariosRouter.delete('/:id', deleteController)