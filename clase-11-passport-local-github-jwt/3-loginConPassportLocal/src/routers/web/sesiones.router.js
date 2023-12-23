import { Router } from 'express'

export const sesionesRouter = Router()

// login

sesionesRouter.get('/login', function (req, res) {
  res.render('login.handlebars', {
    pageTitle: 'Login'
  })
})




