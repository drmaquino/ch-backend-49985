import express from 'express'
import { webRouter } from '../routers/web/web.router.js'
import { apiRouter } from '../routers/api/api.router.js'
import { httpLogger } from '../middlewares/httpLogger.js'

export const app = express()

app.use(httpLogger)

app.use('/static', express.static('./static'))

app.use('/', webRouter)
app.use('/api', apiRouter)

