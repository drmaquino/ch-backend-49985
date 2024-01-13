import express from 'express'
import { engine } from 'express-handlebars'

import { PORT } from './config/config.js'
import { apiRouter } from './routers/api/api.router.js'
import { webRouter } from './routers/web/web.router.js'
import { connectDb } from './database/mongodb.js'
import { cookies } from './middlewares/cookies.js'
import { authentication } from './middlewares/authentication.js'

await connectDb()

export const app = express()

app.engine('handlebars', engine())

app.listen(PORT, () => {
  console.log(`servidor escuchando peticiones en puerto: ${PORT}`)
})

app.use(cookies)
app.use(authentication)

app.use('/static', express.static('./static'))

app.use('/', webRouter)
app.use('/api', apiRouter)
