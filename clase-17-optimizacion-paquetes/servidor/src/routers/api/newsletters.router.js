import { Router } from 'express'
import { deleteController, postController, postEnviarController } from '../../controllers/newsletters.controller.js'

export const newslettersRouter = Router()

newslettersRouter.post('/', postController)
newslettersRouter.delete('/', deleteController)

newslettersRouter.post('/enviar', postEnviarController)
