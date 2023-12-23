import { Router } from 'express'
import passport from 'passport'

export const sesionesRouter = Router()

// login

sesionesRouter.get('/login', function (req, res) {
  res.render('login.handlebars', {
    pageTitle: 'Login'
  })
})

sesionesRouter.get('/githublogin', passport.authenticate('loginGithub'))

sesionesRouter.get('/githubcallback', passport.authenticate('loginGithub', {
  successRedirect: '/profile',
  failureRedirect: '/login',
}))
