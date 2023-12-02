import express from 'express'
import { PORT } from './config.js'
import { apiRouter } from './routers/api.router.js'

const app = express()

app.listen(PORT, () => { console.log(`servidor escuchando en puerto ${PORT}`) })

app.use('/static', express.static('./static'))

app.use('/api', apiRouter)