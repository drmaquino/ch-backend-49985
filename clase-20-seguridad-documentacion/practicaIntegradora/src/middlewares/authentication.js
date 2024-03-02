import passport from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { JWT_PRIVATE_KEY } from '../config/config.js'

passport.use('jwt', new JwtStrategy(
  {
    jwtFromRequest: function (req) {
      var token = null
      if (req && req['signedCookies'] && req['signedCookies']['authorization']) {
        token = req['signedCookies']['authorization']
      }
      return token
    },
    secretOrKey: JWT_PRIVATE_KEY
  },
  (user, done) => {
    done(null, user)
  }
))

export async function authenticateWithJwt(req, res, next) {
  passport.authenticate('jwt', { failWithError: true, session: false })(req, res, error => {
    if (error) {
      const typedError = new Error('error de autenticacion')
      typedError['type'] = 'FAILED_AUTHENTICATION'
      next(typedError)
    } else {
      next()
    }
  })

}

export const authentication = passport.initialize()
