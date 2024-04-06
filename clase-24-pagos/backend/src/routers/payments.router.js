import { Router } from 'express'
import { paymentsController } from '../controllers/payments.controller.js'

export const paymentsRouter = Router()

paymentsRouter.post('/payment-intents', paymentsController.handlePost)

