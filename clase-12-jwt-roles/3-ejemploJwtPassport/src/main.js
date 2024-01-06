import express from 'express'
import cookieParser from 'cookie-parser'
import { engine } from 'express-handlebars'

import { COOKIE_SECRET, PORT } from './config/config.js'

import { connectDb } from './database/mongoose.js'

import { autentication } from './middlewares/authentication.js'
import { apiRouter } from './routers/api/apirest.router.js'
import { webRouter } from './routers/web/web.router.js'

await connectDb()

export const app = express()

app.engine('handlebars', engine())

app.listen(PORT, () => {
  console.log(`servidor escuchando peticiones en puerto: ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser(COOKIE_SECRET))
app.use(autentication)

app.use('/static', express.static('./static'))

app.use('/', webRouter)
app.use('/api', apiRouter)
