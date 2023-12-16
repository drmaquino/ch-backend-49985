import { Router } from 'express'
import { onlyLogueadosWeb } from '../../middlewares/autorizacion.js'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
  res.redirect('/profile')
})

webRouter.get('/register', (req, res) => {
  res.render('register.handlebars', { pageTitle: 'Registro' })
})

webRouter.get('/login', (req, res) => {
  res.render('login.handlebars', { pageTitle: 'Login' })
})

webRouter.get('/profile', onlyLogueadosWeb, (req, res) => {
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    ...req.session['user']
  })
})