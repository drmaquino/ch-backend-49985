import { logger } from './utils/logger.js'
import { connectDb } from './database/mongodb.js'
import { PORT } from './config/config.js'
import { App } from './app/app.js'
import { MONGODB_CNX_STR } from './config/config.js'

await connectDb(MONGODB_CNX_STR)
logger.info(`conectado a base de datos`)

const app = new App()

const port = await app.connect(PORT)
logger.info(`servidor escuchando peticiones en puerto: ${port}`)

