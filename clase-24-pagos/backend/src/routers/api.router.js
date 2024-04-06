import { Router } from 'express'
import { paymentsRouter } from './payments.router.js'

export const apiRouter = Router()

apiRouter.use('/payments', paymentsRouter)
