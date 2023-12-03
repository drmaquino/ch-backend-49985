import express from 'express'
import { PORT } from './config.js'
import { apiRouter } from './routers/api/api.router.js'
import { webRouter } from './routers/web.router.js'
import { engine } from 'express-handlebars'

const app = express()

app.listen(PORT, () => { console.log(`servidor escuchando en puerto ${PORT}`) })

app.engine('handlebars', engine())

app.use('/static', express.static('./static'))

app.use('/api', apiRouter)
app.use('/', webRouter)