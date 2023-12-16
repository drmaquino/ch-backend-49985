import { Router } from 'express'
import { sesionesRouter } from './sesiones.router.js'
import { usuariosRouter } from './usuarios.router.js'

export const apiRouter = Router()

apiRouter.use('/sesiones', sesionesRouter)
apiRouter.use('/usuarios', usuariosRouter)