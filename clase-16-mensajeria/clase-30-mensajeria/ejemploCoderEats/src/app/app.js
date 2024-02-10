import express from 'express'
import { apiRouter } from '../routers/api.router.js'

export const app = express()

app.use('/api', apiRouter)
