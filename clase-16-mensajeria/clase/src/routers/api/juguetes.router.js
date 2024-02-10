import { Router } from 'express'
import { getController, postController } from '../../controllers/juguetes.controller.js'

export const juguetesRouter = Router()

juguetesRouter.get('/', getController)
juguetesRouter.post('/', postController)