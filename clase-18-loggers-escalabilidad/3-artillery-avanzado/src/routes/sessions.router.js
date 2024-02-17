import { Router } from 'express'
import * as sessionsController from "../controllers/sessions.controller.js"

export const sessionsRouter = Router()

sessionsRouter.post('/login', sessionsController.loginUser)
sessionsRouter.post('/register', sessionsController.registerUser)
