import express from 'express'
import handlebars from 'express-handlebars'
import { webRouter } from './routers/web.router.js'
import { Server } from 'socket.io'
import { mensajesManager } from './services/MensajesManager.js'
import { apiRouter } from './routers/api.router.js'


const app = express()

app.engine('handlebars', handlebars.engine())

const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`servidor escuchando en puerto ${PORT}`)
})

const websocketServer = new Server(server)

app.use((req, res, next) => {
  res['notificarNuevoMensaje'] = async () => {
    websocketServer.emit(
      'mensajes',
      await mensajesManager.findAll())
  }
  next()
})

app.use('/static', express.static('./static'))
app.use('/', webRouter)
app.use('/api', apiRouter)

websocketServer.on('connection', async (socket) => {
  console.log('se conectó ' + socket.handshake.auth.usuario)
  socket.broadcast.emit(
    'nuevoUsuario',
    socket.handshake.auth.usuario)

  socket.emit(
    'mensajes',
    await mensajesManager.findAll())

  socket.on('mensaje', async mensaje => {
    await mensajesManager.create(mensaje)
    websocketServer.emit(
      'mensajes',
      await mensajesManager.findAll())
  })

  socket.on('disconnecting', () => {
    socket.broadcast.emit(
      'usuarioDesconectado',
      socket.handshake.auth.usuario)
  })
})