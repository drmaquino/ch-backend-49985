import { Router } from 'express'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
  res.render('home.handlebars', { pageTitle: 'Home' })
})