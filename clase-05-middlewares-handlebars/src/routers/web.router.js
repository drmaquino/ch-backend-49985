import { Router } from 'express'
import { upload } from '../middlewares/middlewares.js'
import { personasManager } from '../services/PersonasManager.js'

export const webRouter = Router()

webRouter.get('/', async (req, res) => {
  const personas = await personasManager.findAll()
  res.render('personas.handlebars', {
    titulo: 'Personas',
    hayPersonas: personas.length > 0,
    personas
  })
})

webRouter.get('/registro', (req, res) => {
  res.render('registro.handlebars', {
    titulo: 'Registro'
  })
})

webRouter.get('/login', (req, res) => {
  res.render('login.handlebars', {
    titulo: 'Login'
  })
})

webRouter.post('/imagenes', upload.single('foto'), (req, res) => {
  console.log(req.file)
  res.send(req.file)
})
