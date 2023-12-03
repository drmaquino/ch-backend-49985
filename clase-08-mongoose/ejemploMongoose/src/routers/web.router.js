import { Router } from 'express'
import { publicacionesDao, usuariosDao } from '../daos/index.js'

export const webRouter = Router()

// Home

webRouter.get('/', async (req, res) => {
  res.redirect('/publicaciones')
})

// Usuarios

webRouter.get('/registro', async (req, res) => {
  res.render('registro.handlebars', { titulo: 'Registro' })
})

webRouter.get('/actualizacion', async (req, res) => {
  if (!req.query.id) {
    return res.send('<p>Usuario no encontrado</p>')
  }

  const usuario = await usuariosDao.findById(req.query.id)
  if (!usuario) {
    return res.send('<p>Usuario no encontrado</p>')
  }

  res.render('actualizacion.handlebars', {
    idUsuario: usuario._id,
    alias: usuario.alias,
    email: usuario.email,
  })
})

webRouter.get('/usuarios', async (req, res) => {
  if (req.query.id) {
    handleUsuarioById(req, res)
  } else {
    handleUsuarios(req, res)
  }
})

async function handleUsuarios(req, res) {
  const usuarios = await usuariosDao.find().lean()
  res.render('usuarios.handlebars', {
    titulo: 'Usuarios',
    hayUsuarios: usuarios.length > 0,
    usuarios,
  })
}

async function handleUsuarioById(req, res) {
  const usuario = await usuariosDao.findById(req.query.id)
  if (!usuario) {
    return res.send('<p>Usuario no encontrado</p>')
  }

  const publicaciones = await publicacionesDao.find({ idAutor: usuario._id }).lean()

  res.render('usuario.handlebars', {
    idUsuario: usuario._id,
    alias: usuario.alias,
    email: usuario.email,
    tieneAmigos: usuario.amigos.length > 0,
    amigos: usuario.amigos,
    tienePublicaciones: usuario.publicaciones.length > 0,
    publicaciones,
    fotoUrl: usuario.fotoUrl
  })
}

// Publicaciones

webRouter.get('/publicaciones', async (req, res) => {
  if (req.query.id) {
    handlePublicacionById(req, res)
  } else {
    handlePublicaciones(req, res)
  }
})

async function handlePublicacionById(req, res) {
  const publicacion = await publicacionesDao.findById(req.query.id)
  if (!publicacion) {
    return res.send('<p>Publicacion no encontrada</p>')
  }
  res.render('publicacion.handlebars', {
    idPublicacion: publicacion._id,
    titulo: publicacion.titulo,
    contenido: publicacion.contenido,
    tieneFoto: !!publicacion.fotoUrl,
    fotoUrl: publicacion.fotoUrl,
    fecha: publicacion.fecha,
    idAutor: publicacion.idAutor,
  })
}

async function handlePublicaciones(req, res) {
  const publicaciones = await publicacionesDao.find().lean()
  res.render('publicaciones.handlebars', {
    titulo: 'Publicaciones',
    hayPublicaciones: publicaciones.length > 0,
    publicaciones,
  })
}
