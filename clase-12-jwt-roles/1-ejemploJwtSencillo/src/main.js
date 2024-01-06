import express from 'express'

import { PORT } from './config/config.js'
import { connectDb } from './database/mongoose.js'

import { apiRouter } from './routers/api/api.router.js'
import { webRouter } from './routers/web/web.router.js'

await connectDb()

const app = express()

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})

app.use('/static', express.static('./static'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)
app.use('/', webRouter)