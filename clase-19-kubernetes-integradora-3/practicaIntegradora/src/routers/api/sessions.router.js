import { Router } from 'express'
import { deleteTokenFromCookie, tokenizeUserInCookie } from '../../middlewares/tokens.js'
import { sessionsPost } from '../../controllers/sessions.controller.js'

export const sessionsRouter = Router()

sessionsRouter.post('/',
  sessionsPost,
  tokenizeUserInCookie,
  (req, res) => { res['created'](req['user']) }
)

sessionsRouter.delete('/current',
  deleteTokenFromCookie,
  (req, res) => { res['ok']() }
)
