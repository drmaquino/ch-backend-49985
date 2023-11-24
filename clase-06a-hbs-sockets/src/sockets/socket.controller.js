import { mensajesManager } from '../services/MensajesManager.js'

export function onConnection(socketServer) {
  return async function (socket) {
    console.log('se conectó ' + socket.handshake.auth.usuario)
    socket.broadcast.emit(
      'nuevoUsuario',
      socket.handshake.auth.usuario)

    socket.emit(
      'mensajes',
      await mensajesManager.findAll())

    socket.on('mensaje', async mensaje => {
      await mensajesManager.create(mensaje)
      socketServer.emit(
        'mensajes',
        await mensajesManager.findAll())
    })

    socket.on('disconnecting', () => {
      socket.broadcast.emit(
        'usuarioDesconectado',
        socket.handshake.auth.usuario)
    })
  }
}

export function inyectarSocketServer(socketServer) {
  return function (req, res, next) {
    res['notificarNuevoMensaje'] = async () => {
      socketServer.emit(
        'mensajes',
        await mensajesManager.findAll())
    }
    next()
  }
}
