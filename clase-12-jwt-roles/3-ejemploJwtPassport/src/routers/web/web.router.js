import { Router } from 'express'
import passport from 'passport'
import { appendJwtAsCookie } from '../../middlewares/authentication.js'

export const webRouter = Router()

webRouter.get('/', (req, res) => { return res.redirect('/profile') })

// registrar usuario

webRouter.get('/register', (req, res) => {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})

// modificar usuario

webRouter.get('/resetpassword', (req, res) => {
  res.render('resetpassword.handlebars', {
    pageTitle: 'Reestablecer contraseña'
  })
})

webRouter.get('/edit', function (req, res) {
  res.render('edit.handlebars', {
    pageTitle: 'Editar mis datos'
  })
})

// ver usuario

webRouter.get('/profile',
  (req, res) => {
    res.render('profile.handlebars', {
      pageTitle: 'Perfil',
      user: req.user,
    })
  })

// iniciar sesion

webRouter.get('/login', (req, res) => {
  res.render('login.handlebars', {
    pageTitle: 'Login'
  })
})

webRouter.get('/githublogin',
  passport.authenticate('github-login',
    { scope: ['user:email'], session: false })
)

webRouter.get('/githubcallback',
  passport.authenticate('github-login',
    { session: false, failureRedirect: '/login' }),
  appendJwtAsCookie,
  (req, res) => { res.redirect('/profile') },
)
