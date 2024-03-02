import { Router } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

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

// const spec = swaggerJSDoc({
//   definition: {
//     openapi: '3.0.1',
//     info: {
//       version: '1',
//       title: 'Swagger Demo',
//       description: 'Demo de swagger para coderhouse'
//     }
//   },
//   apis: ['./docs/**/*.yaml']
// })

// webRouter.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec))