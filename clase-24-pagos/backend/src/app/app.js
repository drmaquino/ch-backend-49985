import express from 'express'
import { apiRouter } from '../routers/api.router.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', apiRouter)

export { app }
