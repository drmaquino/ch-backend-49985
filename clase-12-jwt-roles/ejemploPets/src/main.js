import express from 'express'
import mongoose from 'mongoose'

import { MONGODB_CNX_STR, PORT } from './config.js'
import { router } from './routers/pets.router.js'
import { metodosPersonalizados } from './middlewares/metodosPersonalizados.js'

await mongoose.connect(MONGODB_CNX_STR)

const app = express()
app.listen(PORT, () => { console.log(`escuchando en puerto ${PORT}`) })

app.use(express.json())
app.use(metodosPersonalizados)

app.use('/api/pets', router)
