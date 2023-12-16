import { Router } from 'express'
import { usuariosManager } from '../../models/Usuario.js'
import { ADMIN_EMAIL } from '../../config.js'

export const sesionesRouter = Router()

sesionesRouter.post('/', async (req, res) => {
  const usuario = await usuariosManager.findOne(req.body)
  if (!usuario) {
    return res
      .status(401)
      .json({
        status: 'error',
        message: 'login failed'
      })
  }
  req.session['user'] = {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
  }

  if (usuario.email === ADMIN_EMAIL) {
    req.session['user'].rol = 'admin'
  } else {
    req.session['user'].rol = 'usuario'
  }

  res
    .status(201)
    .json({
      status: 'success',
      payload: req.session['user']
    })
})

sesionesRouter.delete('/current', async (req, res) => {
  req.session.destroy(err => {
    res.status(204).json({ status: 'success' })
  })
})