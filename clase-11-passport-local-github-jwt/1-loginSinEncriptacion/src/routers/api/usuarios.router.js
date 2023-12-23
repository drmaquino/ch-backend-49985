import { Router } from 'express'
import { usuariosManager } from '../../models/User.js'
import { soloLogueadosApi } from '../../middlewares/sesiones.js'

export const usuariosRouter = Router()

usuariosRouter.post('/', async (req, res) => {
  try {
    const usuario = await usuariosManager.create(req.body)
    res
      .status(201)
      .json({
        status: 'success',
        payload: usuario
      })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
})

usuariosRouter.get('/current', soloLogueadosApi, async (req, res) => {
  const usuario = await usuariosManager.findOne({ email: req.session['user'].email }, { password: 0 }).lean()
  res.json({ status: 'success', payload: usuario })
})