import { Router } from 'express'
import {
  handlePost,
} from '../controllers/sessions.controller.js'

export const sessionsRouter = Router()

sessionsRouter.post('/', handlePost)
