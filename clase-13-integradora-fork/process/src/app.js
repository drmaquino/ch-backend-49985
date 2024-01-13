import mongoose from 'mongoose'
import express from 'express'

import { PORT, CNX_STR } from './config/config.js'

//@ts-ignore
await mongoose.connect(CNX_STR)
console.log(`conectado a DB en ${CNX_STR}`)

const app = express()

app.listen(PORT, () => {
  console.log(`escuchando peticiones en puerto :${PORT}`)
  // console.log('id de proceso: ' + process.pid)
  // console.log('ejecutandose en directorio: ' + process.cwd())
  // console.log(process.argv.slice(2))
  // console.log(process.env)
})

app.get('/health', (req, res) => {
  res.send('OK')
})

app.get('/exit', (req, res) => {
  process.exit()
})

process.on('exit', codigo => {
  console.log('saliendo con codigo: ' + codigo)
})

