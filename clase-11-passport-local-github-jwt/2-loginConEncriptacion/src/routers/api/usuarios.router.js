import { Router } from 'express'
import { usuariosManager } from '../../models/User.js'
import { soloLogueadosApi } from '../../middlewares/sesiones.js'
import { hashear } from '../../utils/criptografia.js'

export const usuariosRouter = Router()

usuariosRouter.post('/', async (req, res) => {
  try {

    // encripto password!
    req.body.password = hashear(req.body.password)

    const usuario = await usuariosManager.create(req.body)
    res.status(201).json({ status: 'success', payload: usuario })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
})

usuariosRouter.get('/current', soloLogueadosApi, async (req, res) => {
  const usuario = await usuariosManager.findOne({ email: req.session['user'].email }, { password: 0 }).lean()
  res.json({ status: 'success', payload: usuario })
})

usuariosRouter.put('/', async function (req, res) {
  try {

    // encripto password!
    req.body.password = hashear(req.body.password)

    const actualizado = await usuariosManager.updateOne(
      { email: req.body.email },
      { $set: { password: req.body.password } },
      { new: true }
    )

    if (!actualizado) {
      return res.status(404).json({ status: 'error', message: 'usuario no encontrado' })
    }

    res.json({ status: 'success', payload: actualizado })
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
})