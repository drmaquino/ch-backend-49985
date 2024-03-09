import { Router } from 'express'
import { tokenizeUserInCookie } from '../../middlewares/tokens.js'
import { soloRoles } from '../../middlewares/authorization.js'
import { usersGet, usersPost } from '../../controllers/users.controller.js'
import { authenticateWithJwt } from '../../middlewares/authentication.js'
// import passport from 'passport'

export const usersRouter = Router()

usersRouter.post('/',
  usersPost,
  tokenizeUserInCookie,
  (req, res) => { res['created'](req['user']) }
)

usersRouter.get('/current',
  //@ts-ignore
  // passport.authenticate('jwt', { failWithError: true, session: false }),
  authenticateWithJwt,
  async (req, res, next) => { res['jsonOk'](req['user']) }
)

usersRouter.get('/',
  //@ts-ignore
  // passport.authenticate('jwt', { failWithError: true, session: false }),
  authenticateWithJwt,
  soloRoles(['admin']),
  usersGet
)
