import express from 'express'

import { PORT } from './config.js'

import { restApiRouter } from './routers/api/restapi.router.js'
import { webRouter } from './routers/web/web.router.js'

const app = express()

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})

app.use('/static', express.static('./static'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', restApiRouter)
app.use('/', webRouter)
