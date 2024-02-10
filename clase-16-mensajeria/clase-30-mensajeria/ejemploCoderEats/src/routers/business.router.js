import { Router } from 'express'
import {
  handleGet,
  handlePost,
  // handlePut,
  // handleDelete,
} from '../controllers/business.controller.js'

export const businessRouter = Router()

businessRouter.get('/:id?', handleGet)
businessRouter.post('/', handlePost)
// businessRouter.put('/:id', handlePut)
// businessRouter.delete('/:id', handleDelete)
