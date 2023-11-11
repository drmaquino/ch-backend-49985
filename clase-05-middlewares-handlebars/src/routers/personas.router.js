import { Router } from 'express'
import { getController, postController } from '../controllers/personas.controller.js'

export const personasRouter = Router()

personasRouter.get('/', getController)

personasRouter.post('/',
  postController)