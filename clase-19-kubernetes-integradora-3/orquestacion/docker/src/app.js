import express from 'express'
import { randomBytes } from 'node:crypto'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/demo'

await mongoose.connect(mongoUrl)
console.log(`conectado a db en ${mongoUrl}`)

const serverId = randomBytes(4).toString('hex')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/users', async (req, res) => {
  const users = await mongoose.connection.collection('users').find().toArray()
  res.json({ servidor: serverId, payload: { users } })
})

app.post('/api/users', async (req, res) => {
  const user = { createdBy: serverId, ...req.body }
  const { insertedId } = await mongoose.connection.collection('users').insertOne(user)
  res.json({ servidor: serverId, payload: { insertedId } })
})

app.listen(8080, () => { console.log(`servidor ${serverId} escuchando en 8080!`) })

process.on('unhandledRejection', () => { })
process.on('uncaughtException', () => { })
