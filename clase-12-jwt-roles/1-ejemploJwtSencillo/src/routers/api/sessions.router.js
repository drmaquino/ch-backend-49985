import { Router } from 'express'
import { usersManager } from '../../models/mongoose/User.js'
import { encriptar } from '../../utils/criptografia.js'
import { authenticate, extraerTokenDeLaQuery } from '../../middlewares/authorization.js'

export const sessionsRouter = Router()

// login
sessionsRouter.post('/', async (req, res, next) => {
  const credentials = req.body
  const user = await usersManager.findOne(credentials)

  if (!user) {
    return res.status(401).json({
      status: 'error',
      message: 'authentication failed'
    })
  }

  try {
    const accessToken = await encriptar(user.toObject())
    res.status(201).json({
      status: 'success',
      payload: user.toObject(),
      accessToken
    })
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message })
  }
})

sessionsRouter.get('/current',
  extraerTokenDeLaQuery(),
  authenticate,
  async (req, res, next) => {
    try {
      res.json({ status: 'success', payload: req['user'] })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  })