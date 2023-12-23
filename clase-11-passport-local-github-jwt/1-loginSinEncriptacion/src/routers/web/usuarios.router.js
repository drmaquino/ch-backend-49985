import { Router } from 'express'
import { usuariosManager } from '../../models/User.js'
import { soloLogueadosWeb } from '../../middlewares/sesiones.js'

export const usuariosRouter = Router()

// registro

usuariosRouter.get('/register', function registerView(req, res) {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})


usuariosRouter.post('/register', async function registrarUsuario(req, res) {
  try {
    await usuariosManager.create(req.body)
    res.redirect('/login')
  } catch (error) {
    res.redirect('/register')
  }
})

// perfil

usuariosRouter.get('/profile', soloLogueadosWeb, function profileView(req, res) {
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    user: req.session['user']
  })
})
