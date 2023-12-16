import express from 'express'
import cookieParser from 'cookie-parser'
import { engine } from 'express-handlebars'

const app = express()

app.use(cookieParser())

app.use('/static', express.static('./static'))

app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine())

//web
app.get('/', (req, res) => {
    res.render('cookies.handlebars')
})

//api
app.post('/api/cookie', (req, res) => {
    const data = req.body
    console.log('POST:' + JSON.stringify(data))
    res.cookie('CoderCookie', data, {
        // maxAge: 10_000
    })
    res.status(201).json({ status: "success", message: "cookie set" })
})

app.listen(8080, () => console.log("Listening on 8080"))