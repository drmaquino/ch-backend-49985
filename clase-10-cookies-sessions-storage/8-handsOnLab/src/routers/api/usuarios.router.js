import { Router } from 'express'
import { usuariosManager } from '../../models/Usuario.js'

export const usuariosRouter = Router()

usuariosRouter.post('/', async (req, res) => {
  try {
    const usuario = await usuariosManager.create(req.body)
    res.status(201).json({
      status: 'success',
      payload: usuario.toObject()
    })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
})