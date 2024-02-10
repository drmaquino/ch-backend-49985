import { Router, json } from 'express'
import { usersRouter } from './users.router.js'
import { ordersRouter } from './orders.router.js'
import { businessRouter } from './business.router.js'

export const apiRouter = Router()

apiRouter.use(json())

apiRouter.use('/users', usersRouter)
apiRouter.use('/orders', ordersRouter)
apiRouter.use('/business', businessRouter)

apiRouter.use((error, req, res, next) => {
  // personalizar los codigos segun el tipo de error!
  // res.status(400? 404? 500?...)
  res.json({ status: 'error', message: error.message })
})