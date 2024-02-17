import express from 'express'
import mongoose from 'mongoose'
import { sessionsRouter } from './routes/sessions.router.js'
import { faker } from '@faker-js/faker'

const PORT = process.env.PORT || 8080

await mongoose.connect(`mongodb://localhost/coderhouse`)

const app = express()

app.use(express.json())

app.use('/api/sessions', sessionsRouter)

//Este endpoint sirve para poder crear el usuario virtual con variables para utilizar en el resto de endpoints
app.get('/api/test/user', (req, res) => {
    const first_name = faker.person.firstName()
    const last_name = faker.person.lastName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    res.json({ first_name, last_name, email, password })
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))