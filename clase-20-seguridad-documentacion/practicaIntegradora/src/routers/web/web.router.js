import { Router } from 'express'

import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import { SWAGGER_CONFIG } from '../../config/config.js'

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

const spec = swaggerJsdoc(SWAGGER_CONFIG)
webRouter.use('/api-docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(spec)
)