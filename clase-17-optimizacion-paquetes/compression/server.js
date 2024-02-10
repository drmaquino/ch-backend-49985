
import express from 'express'
import compression from 'express-compression'

const app = express()

const mensaje = 'Hola que tal'
const mensajeLaaaaaargo = mensaje.repeat(1000)

app.get('/saludo', (req, res) => {
  res.send(mensajeLaaaaaargo)
})

// @ts-ignore
app.get('/saludogzip', compression(), (req, res) => {
  res.send(mensajeLaaaaaargo)
})

// @ts-ignore
app.get('/saludobrotli', compression({ brotli: { enabled: true, zlib: {} } }), (req, res) => {
  res.send(mensajeLaaaaaargo)
})

const PORT = parseInt(process.argv[2]) || 8080
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`)
})
