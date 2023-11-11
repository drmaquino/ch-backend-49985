import express from 'express'
import handlebars from 'express-handlebars'
import { webRouter } from './routers/web.router.js'
import { apiRouter } from './routers/api.router.js'

const app = express()

// motor de plantillas: handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', './views')

// middlewares
app.use(express.json()) // para json
app.use(express.urlencoded({ extended: true })) // para forms

app.use(express.static('./public'))
app.use(express.static('./views'))
app.use('/static', express.static('./static'))

// routers
app.use('/', webRouter)
app.use('/api', apiRouter)

//
app.listen(8080, () => { console.log('conectado!') })

