import passport from 'passport'
import { usuariosManager } from '../models/User.js'

// jwt ---------------------------------------------------------

import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { JWT_PRIVATE_KEY } from '../config/config.js'

const COOKIE_OPTS = { signed: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }

export async function appendJwtAsCookie(req, res, next) {
  try {
    const accessToken = await encriptar(req.user)
    res.cookie('authorization', accessToken, COOKIE_OPTS)
    next()
  } catch (error) {
    next(error)
  }
}

export async function removeJwtFromCookies(req, res, next) {
  res.clearCookie('authorization', COOKIE_OPTS)
  next()
}

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
    let token = null
    if (req?.signedCookies) {
      token = req.signedCookies['authorization']
    }
    return token
  }]),
  secretOrKey: JWT_PRIVATE_KEY,
}, function loginUser(user, done) {
  // console.log(user)
  done(null, user)
}))

// github ---------------------------------------------------------

import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/config.js'

passport.use('github-login', new GithubStrategy({
  clientID: githubClienteId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async function verify(accessToken, refreshToken, profile, done) {
  // console.log(profile)
  const usuario = await usuariosManager.findOne({ email: profile.username })
  if (usuario) {
    return done(null, {
      ...usuario.infoPublica(),
      rol: 'usuario'
    })
  }

  try {
    const registrado = await usuariosManager.registrar({
      nombre: profile.displayName,
      apellido: '(sin especificar)',
      email: profile.username,
      password: '(sin especificar)',
    })
    done(null, registrado)
  } catch (error) {
    done(error)
  }
}))

// local ---------------------------------------------------------

import { Strategy as LocalStrategy } from 'passport-local'
import { encriptar } from '../utils/criptografia.js'

passport.use('local-register', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'email'
},
  async (req, _u, _p, done) => {
    try {
      const datosUsuario = await usuariosManager.registrar(req.body)
      done(null, datosUsuario)
    } catch (error) {
      done(null, false, error.message)
    }
  }))

passport.use('local-login', new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const datosUsuario = await usuariosManager.autenticar(email, password)
    done(null, datosUsuario)
  } catch (error) {
    return done(null, false, error.message)
  }
}))

// ---------------------------------------------------------

export const autentication = passport.initialize()
