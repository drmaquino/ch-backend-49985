import { Router } from 'express'

export const usuariosRouter = Router()

usuariosRouter.get('/', (req, res) => {
  res.json([{ nombre: 'marian' }])
})