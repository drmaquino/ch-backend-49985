import { Router } from 'express'
import {
  handleGet,
  handlePost,
  // handlePut,
  // handleDelete,
} from '../controllers/users.controller.js'

export const usersRouter = Router()

usersRouter.get('/:id?', handleGet)
usersRouter.post('/', handlePost)
// usersRouter.put('/:id', handlePut)
// usersRouter.delete('/:id', handleDelete)
