import { Router } from 'express'
import { getController, postController } from '../controllers/personas.controller.js'
import { midOpc } from '../middlewares/middlewares.js'

export const ventasRouter = Router()

ventasRouter.get('/', getController)

ventasRouter.post('/',
  midOpc,
  postController)
