import { Router } from 'express'
import { tokenizeUserInCookie } from '../../middlewares/tokens.js'
import { soloRoles } from '../../middlewares/authorization.js'
import { usersGet, usersPost } from '../../controllers/users.controller.js'
import { authenticateWithJwt } from '../../middlewares/authentication.js'

export const usersRouter = Router()

usersRouter.post('/',
  usersPost,
  tokenizeUserInCookie,
  (req, res) => { res['jsonOk'](req['user']) }
)

usersRouter.get('/current',
  authenticateWithJwt,
  async (req, res, next) => { res['jsonOk'](req['user']) }
)

usersRouter.get('/',
  authenticateWithJwt,
  soloRoles(['admin']),
  usersGet
)
