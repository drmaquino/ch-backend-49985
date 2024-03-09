import { connectDb } from './database/mongodb.js'
import { Server } from './app/app.js'
import { PORT } from './config/config.js'

await connectDb()
console.log(`conectado a base de datos`)

const server = new Server()

await server.connect(PORT)
console.log(`servidor escuchando peticiones en puerto: ${PORT}`)

