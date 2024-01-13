import { Router } from 'express'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
  res.redirect('/profile')
})

webRouter.get('/profile', (req, res) => {
  res.render('profile.handlebars', { pageTitle: 'Home' })
})

webRouter.get('/register', (req, res) => {
  res.render('register.handlebars', { pageTitle: 'Home' })
})

webRouter.get('/login', (req, res) => {
  res.render('login.handlebars', { pageTitle: 'Home' })
})