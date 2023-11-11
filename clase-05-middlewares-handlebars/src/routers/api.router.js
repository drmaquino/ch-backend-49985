import { Router } from 'express'
import { personasRouter } from './personas.router.js'
import { ventasRouter } from './ventas.router.js'

export const apiRouter = Router()

apiRouter.use('/personas', personasRouter)
apiRouter.use('/ventas', ventasRouter)
