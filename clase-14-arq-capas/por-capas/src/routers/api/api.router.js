import { Router, json, urlencoded } from 'express'
import { juguetesRouter } from './juguetes.router.js'
import { manejoDeErrores } from '../../middlewares/manejoDeErrores.js'
import { respuestasMejoradas } from '../../middlewares/respuestasMejoradas.js'

export const apiRouter = Router()

apiRouter.use(respuestasMejoradas)

apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

apiRouter.use('/juguetes', juguetesRouter)

apiRouter.use(manejoDeErrores)