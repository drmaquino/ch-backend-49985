import { Router } from 'express'

export const usuariosRouter = Router()

// registro

usuariosRouter.get('/register', function (req, res) {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})

// reestablecer contraseña

usuariosRouter.get('/resetpassword', function (req, res) {
  res.render('resetpassword.handlebars', {
    pageTitle: 'Reestablecer contraseña'
  })
})

// perfil

usuariosRouter.get('/profile', function (req, res) {
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    user: req.user
  })
})
