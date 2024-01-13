import { Router, json, urlencoded } from 'express'
import { usersRouter } from './users.router.js'
import { sessionsRouter } from './sessions.router.js'

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

// respuestas homogeneas
apiRouter.use((req, res, next) => {
  res['jsonOk'] = (payload) => {
    res.json({ status: 'success', payload })
  }
  res['jsonError'] = (error) => {
    res.json({ status: 'error', message: error.message, error })
  }
  next()
})

apiRouter.use('/users', usersRouter)
apiRouter.use('/sessions', sessionsRouter)

apiRouter.use((error, req, res, next) => {
  switch (error.type) {
    case 'INVALID_ARGUMENT':
      res.status(400)
      break
    case 'FAILED_AUTHENTICATION':
      res.status(401)
      break
    case 'FAILED_AUTHORIZATION':
      res.status(403)
      break
    case 'INTERNAL_ERROR':
      res.status(500)
      break
    default:
      console.log('no se que pasó! error desconocido/inesperado!')
      console.log(JSON.stringify(error, null, 2))
      res.status(500)
  }
  res.json({
    status: 'error',
    message: error.message
  })
})