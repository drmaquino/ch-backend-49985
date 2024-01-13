import { Router } from 'express'
import { User } from '../../models/User.js'
import { tokenizeUserInCookie } from '../../middlewares/tokens.js'
import passport from 'passport'
import { soloRoles } from '../../middlewares/authorization.js'

export const usersRouter = Router()

usersRouter.post('/',
  async (req, res, next) => {
    try {
      const user = await User.registrar(req.body)
      req.user = user
      next()
    } catch (error) {
      next(error)
    }
  },
  tokenizeUserInCookie,
  (req, res) => {
    res.json(req.user)
  }
)

usersRouter.get('/current',
  passport.authenticate('jwt', { failWithError: true, session: false }),
  async (req, res, next) => {
    res.json(req.user)
  }
)

usersRouter.get('/',
  passport.authenticate('jwt', { failWithError: true, session: false }),
  soloRoles(['admin']),
  async (req, res, next) => {
    try {
      const users = await User.find().lean()
      res.json(users)
    } catch (error) {
      next(error)
    }
  }
)
