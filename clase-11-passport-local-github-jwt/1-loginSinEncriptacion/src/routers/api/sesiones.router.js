import { Router } from 'express'
import { usuariosManager } from '../../models/User.js'

export const sesionesRouter = Router()

sesionesRouter.post('/', async (req, res) => {

  const { email, password } = req.body

  let datosUsuario

  if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    datosUsuario = {
      email: 'admin',
      nombre: 'admin',
      apellido: 'admin',
      rol: 'admin'
    }
  } else {
    const usuario = await usuariosManager.findOne({ email }).lean()

    if (!usuario) {
      return res.status(400).json({ status: 'error', message: 'login failed' })
    }

    // deberia encriptar la recibida y comparar con la guardada que ya esta encriptada
    if (password !== usuario.password) {
      return res.status(400).json({ status: 'error', message: 'login failed' })
    }

    datosUsuario = {
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: 'usuario'
    }
  }

  req.session['user'] = datosUsuario
  res.status(201).json({ status: 'success', message: 'login success' })
})

sesionesRouter.get('/current', (req, res) => {
  if (req.session['user']) {
    return res.json(req.session['user'])
  }
  res.status(400).json({ status: 'error', message: 'no hay una sesion iniciada' })
})

sesionesRouter.delete('/current', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ status: 'logout error', body: err })
    }
    res.json({ status: 'success', message: 'logout OK' })
  })
})

