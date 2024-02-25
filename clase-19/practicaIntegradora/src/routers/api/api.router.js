import { Router, json, urlencoded } from 'express'
import { usersRouter } from './users.router.js'
import { sessionsRouter } from './sessions.router.js'
import { respuestasHttp } from '../../middlewares/respuestasHttp.js'
import { manejoDeErrores } from '../../middlewares/manejoDeErrores.js'

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

// respuestas homogeneas
apiRouter.use(respuestasHttp)

apiRouter.use('/users', usersRouter)
apiRouter.use('/sessions', sessionsRouter)

apiRouter.use(manejoDeErrores)
