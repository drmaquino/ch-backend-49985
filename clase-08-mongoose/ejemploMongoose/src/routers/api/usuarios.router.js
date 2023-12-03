import { Router } from 'express'
import { publicacionesDao, usuariosDao } from '../../daos/index.js'
import { extraerArchivo } from '../../middlewares/files.js'

export const usuariosRouter = Router()

// Usuarios

usuariosRouter.get('/', async (req, res) => {
  const usuarios = await usuariosDao.find().lean()
  res.json(usuarios)
})

usuariosRouter.get('/:id', async (req, res) => {
  const usuario = await usuariosDao.findById(req.params.id).lean()
  res.json(usuario)
})

usuariosRouter.post('/', extraerArchivo('foto'), async (req, res) => {
  try {
    if (req.file) {
      req.body.fotoUrl = req.file.path
    }
    const usuario = await usuariosDao.create(req.body)
    res.status(201).json(usuario.toObject())
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

usuariosRouter.put('/:id', extraerArchivo('foto'), async (req, res) => {
  const camposAActualizar = {}

  if (req.file) {
    camposAActualizar.fotoUrl = req.file.path
  }

  if (req.body.alias) {
    camposAActualizar.alias = req.body.alias
  }

  let actualizado
  try {
    actualizado = await usuariosDao.findByIdAndUpdate(req.params.id, { $set: camposAActualizar }, { new: true })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }

  if (!actualizado) {
    return res.status(404).json({ message: 'usuario no encontrado' })
  }

  res.json(actualizado)
})

usuariosRouter.delete('/:id', async (req, res) => {
  const borrado = await usuariosDao.findByIdAndDelete(req.params.id).lean()

  if (!borrado) {
    return res.status(404).json({ message: 'usuario no encontrado' })
  }

  await publicacionesDao.deleteMany({ idAutor: borrado._id })

  res.json(borrado)
})

// Publicaciones

usuariosRouter.post('/:id/publicaciones', extraerArchivo('foto'), async (req, res) => {
  if (req.file) {
    req.body.fotoUrl = req.file.path
  }

  const usuario = await usuariosDao.findById(req.params.id)
  if (!usuario) {
    return res.status(404).json({ message: 'usuario no encontrado' })
  }

  let publicacion
  try {
    publicacion = await publicacionesDao.create(req.body)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }

  await usuario.agregarPublicacion(publicacion._id)

  res.status(201).json(publicacion.toObject())
})

usuariosRouter.delete('/:uid/publicaciones/:pid', async (req, res) => {
  const usuario = await usuariosDao.findById(req.params.uid)
  if (!usuario) {
    return res.status(404).json({ message: 'usuario no encontrado' })
  }

  const eliminada = await usuario.eliminarPublicacion(req.params.pid)
  if (!eliminada) {
    return res.status(400).json({ message: 'usuario sin permiso para eliminar la publicacion' })
  }

  const publicacion = await publicacionesDao.findByIdAndDelete(req.params.pid).lean()
  if (!publicacion) {
    return res.status(404).json({ message: 'publicacion no encontrada' })
  }

  res.json(publicacion)
})