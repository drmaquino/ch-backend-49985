import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'

import { MONGODB_CNX_STR, PORT } from './config.js'
import { apiRouter } from './routers/api/apirest.router.js'
import { webRouter } from './routers/web/web.router.js'
import { sesiones } from './middlewares/sesiones.js'

await mongoose.connect(MONGODB_CNX_STR)
console.log(`conectado a base de datos en: "${MONGODB_CNX_STR}"`)

export const app = express()

app.engine('handlebars', engine())

app.listen(PORT, () => {
  console.log(`servidor escuchando peticiones en puerto: ${PORT}`)
})

app.use('/static', express.static('./static'))

app.use(sesiones)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', webRouter)
app.use('/api', apiRouter)