import { Router } from 'express'
import {
  handleGet,
  handlePost,
  handlePut,
  // handleDelete,
} from '../controllers/orders.controller.js'

export const ordersRouter = Router()

ordersRouter.get('/:id?', handleGet)
ordersRouter.post('/', handlePost)
ordersRouter.put('/:id', handlePut)
// ordersRouter.delete('/:id', handleDelete)
