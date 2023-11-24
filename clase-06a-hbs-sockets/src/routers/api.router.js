import { Router, json } from 'express'
import { mensajesManager } from '../services/MensajesManager.js'

export const apiRouter = Router()
apiRouter.use(json())

apiRouter.post('/mensajes', async (req, res) => {
  try {
    const mensaje = req.body
    await mensajesManager.create(mensaje)
    res['notificarNuevoMensaje']()
    res.status(201).json()
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
})