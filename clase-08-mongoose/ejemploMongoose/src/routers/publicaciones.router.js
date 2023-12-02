import { Router } from 'express'
import { publicacionesManager } from '../database/index.js'
import { extraerArchivo } from '../middlewares/files.js'

export const publicacionesRouter = Router()

publicacionesRouter.get('/', async (req, res) => {
  const publicaciones = await publicacionesManager.find().lean()
  res.json(publicaciones)
})

publicacionesRouter.get('/:id', async (req, res) => {
  const publicacion = await publicacionesManager.findById(req.params.id).lean()
  res.json(publicacion)
})

publicacionesRouter.post('/', extraerArchivo('foto'), async (req, res) => {
  try {
    if (req.file) {
      req.body.fotoUrl = req.file.path
    }
    const usuario = await publicacionesManager.create(req.body)
    res.status(201).json(usuario.toObject())
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})


publicacionesRouter.post('/:id/actualizaciones', extraerArchivo('foto'), async (req, res) => {
  const camposAActualizar = {}

  if (req.file) {
    camposAActualizar.fotoUrl = req.file.path
  }

  if (req.body.alias) {
    camposAActualizar.alias = req.body.alias
  }

  let actualizado
  try {
    actualizado = await publicacionesManager.findByIdAndUpdate(req.params.id, { $set: camposAActualizar }, { new: true })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }

  if (!actualizado) {
    return res.status(404).json({ message: 'usuario no encontrado' })
  }

  res.json(actualizado)
})

publicacionesRouter.delete('/:id', async (req, res) => {
  const borrado = await publicacionesManager.findByIdAndDelete(req.params.id)

  if (!borrado) {
    return res.status(404).json({ message: 'usuario no encontrado' })
  }

  res.json(borrado)
})