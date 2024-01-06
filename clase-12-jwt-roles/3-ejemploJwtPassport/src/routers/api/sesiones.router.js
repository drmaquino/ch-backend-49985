import { Router } from 'express'
import passport from 'passport'

import { appendJwtAsCookie, removeJwtFromCookies } from '../../middlewares/authentication.js'

export const sesionesRouter = Router()

sesionesRouter.post('/',
  passport.authenticate('local-login',
    { failWithError: true, session: false }),
  appendJwtAsCookie,
  async function (req, res) {
    res['creado'](req.user)
  },
)

sesionesRouter.get('/current',
  passport.authenticate('jwt',
    { failWithError: true, session: false }),
  function (req, res) {
    res['ok'](req.user)
  },
)

sesionesRouter.delete('/current',
  removeJwtFromCookies,
  (req, res) => {
    res['ok']({ message: 'logout OK' })
  }
)

