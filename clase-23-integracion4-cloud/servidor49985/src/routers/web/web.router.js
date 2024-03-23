import { Router } from 'express'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
  res.redirect('/profile')
})

webRouter.get('/profile', (req, res) => {
  res.render('profile.handlebars', { pageTitle: 'Inicio' })
})

webRouter.get('/register', (req, res) => {
  res.render('register.handlebars', { pageTitle: 'Inicio' })
})

webRouter.get('/login', (req, res) => {
  res.render('login.handlebars', { pageTitle: 'Inicio' })
})