import { Router } from 'express'

export const webRouter = Router()

webRouter.get('/register', (req, res) => {
  res.sendFile('register.html', { root: './views' })
})

webRouter.get('/login', (req, res) => {
  res.sendFile('login.html', { root: './views' })
})

webRouter.get('/', (req, res) => {
  res.sendFile('index.html', { root: './views' })
})