import express from 'express'
import handlebars from 'express-handlebars'
import { webRouter } from './routers/web.router.js'
import { Server } from 'socket.io'
import { apiRouter } from './routers/api.router.js'
import { inyectarSocketServer, onConnection } from './sockets/socket.controller.js'


const app = express()

app.engine('handlebars', handlebars.engine())

const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`servidor escuchando en puerto ${PORT}`)
})

const websocketServer = new Server(server)
websocketServer.on('connection', onConnection(websocketServer))

app.use(inyectarSocketServer(websocketServer))

app.use('/static', express.static('./static'))
app.use('/', webRouter)
app.use('/api', apiRouter)
