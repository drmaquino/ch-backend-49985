import { Router } from 'express'
import { usersManager } from '../../models/mongoose/User.js'
import { encriptar } from '../../utils/criptografia.js'
import { authenticate, extraerTokenDeLaQuery } from '../../middlewares/authorization.js'

export const usersRouter = Router()

usersRouter.post('/', async (req, res, next) => {
  const userData = req.body
  const user = await usersManager.create(userData)

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

usersRouter.get('/current',
  extraerTokenDeLaQuery(),
  authenticate,
  async (req, res, next) => {
    try {
      res.json({ status: 'success', payload: req['user'] })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  })