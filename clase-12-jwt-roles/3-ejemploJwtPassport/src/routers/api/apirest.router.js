import { Router } from 'express'

import { sesionesRouter } from './sesiones.router.js'
import { usuariosRouter } from './usuarios.router.js'
import { respuestasMejoradas } from '../../middlewares/respuestasMejoradas.js'

export const apiRouter = Router()

apiRouter.use(respuestasMejoradas)

apiRouter.use('/sesiones', sesionesRouter)
apiRouter.use('/usuarios', usuariosRouter)

apiRouter.use((error, req, res, next) => {
  res.status(401).json({
    status: 'error',
    message: 'authentication failed'
  })
})