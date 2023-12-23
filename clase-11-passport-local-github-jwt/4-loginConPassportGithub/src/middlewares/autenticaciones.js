import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { usuariosManager } from '../models/User.js'
import { GITHUB_CALLBACK_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../config.js'

passport.use('loginLocal', new LocalStrategy({
  usernameField: 'email'
}, async function verificationCallback(username, password, done) {
  try {
    const datosUsuario = await usuariosManager.login(username, password)
    done(null, datosUsuario)
  } catch (error) {
    done(error)
  }
}))

passport.use('loginGithub', new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: GITHUB_CALLBACK_URL
}, async (_, __, profile, done) => {
  let usuario = await usuariosManager.findOne({ email: profile.username })
  if (!usuario) {
    usuario = await usuariosManager.create({
      nombre: profile.displayName,
      email: profile.username,
    })
  }
  done(null, usuario.toObject())
}))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()