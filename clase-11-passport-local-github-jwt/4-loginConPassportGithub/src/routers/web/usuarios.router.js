import { Router } from 'express'

export const usuariosRouter = Router()

// registro

usuariosRouter.get('/register', function (req, res) {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})

// modificar usuario

usuariosRouter.get('/resetpassword', function (req, res) {
  res.render('resetpassword.handlebars', {
    pageTitle: 'Reestablecer contraseña'
  })
})

usuariosRouter.get('/edit', function (req, res) {
  res.render('edit.handlebars', {
    pageTitle: 'Editar mis datos'
  })
})

// perfil

usuariosRouter.get('/profile', function (req, res) {
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    user: req.user
  })
})
