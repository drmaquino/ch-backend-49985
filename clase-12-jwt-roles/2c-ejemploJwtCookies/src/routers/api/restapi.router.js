import { Router } from 'express'

import { usuariosRouter } from './usuarios.router.js'
import { sesionesRouter } from './sesiones.router.js'

export const restApiRouter = Router()

restApiRouter.use('/usuarios', usuariosRouter)
restApiRouter.use('/sesiones', sesionesRouter)