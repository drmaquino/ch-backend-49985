import { Router } from 'express'
import { publicacionesManager, usuariosManager } from '../database/index.js'
import { extraerArchivo } from '../middlewares/files.js'

export const usuariosRouter = Router()

usuariosRouter.get('/', async (req, res) => {
  const usuarios = await usuariosManager.find().lean()
  res.json(usuarios)
})

usuariosRouter.get('/:id', async (req, res) => {
  const usuario = await usuariosManager.findById(req.params.id).lean()
  res.json(usuario)
})

usuariosRouter.post('/', extraerArchivo('foto'), async (req, res) => {
  try {
    if (req.file) {
      req.body.fotoUrl = req.file.path
    }
    const usuario = await usuariosManager.create(req.body)
    res.status(201).json(usuario.toObject())
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})


usuariosRouter.post('/:id/actualizaciones', extraerArchivo('foto'), async (req, res) => {
  const camposAActualizar = {}

  if (req.file) {
    camposAActualizar.fotoUrl = req.file.path
  }

  if (req.body.alias) {
    camposAActualizar.alias = req.body.alias
  }

  let actualizado
  try {
    actualizado = await usuariosManager.findByIdAndUpdate(req.params.id, { $set: camposAActualizar }, { new: true })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }

  if (!actualizado) {
    return res.status(404).json({ message: 'usuario no encontrado' })
  }

  res.json(actualizado)
})

usuariosRouter.delete('/:id', async (req, res) => {
  const borrado = await usuariosManager.findByIdAndDelete(req.params.id)

  if (!borrado) {
    return res.status(404).json({ message: 'usuario no encontrado' })
  }

  res.json(borrado)
})

usuariosRouter.post('/:id/publicaciones', extraerArchivo('foto'), async (req, res) => {
  if (req.file) {
    req.body.fotoUrl = req.file.path
  }

  const usuario = await usuariosManager.findById(req.params.id)
  if (!usuario) {
    return res.status(404).json({ message: 'usuario no encontrado' })
  }

  let publicacion
  try {
    publicacion = await publicacionesManager.create(req.body)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }

  usuario.agregarPublicacion(publicacion._id)

  res.status(201).json(publicacion.toObject())
})