import express from 'express'
import { UserManager } from './UserManager.js'

// Create - POST
// Read - GET
// Update - PUT
// Delete - DELETE

const um = new UserManager('./db/usuarios.json')

const app = express()

app.use(express.urlencoded({ extended: true })) // para forms
app.use(express.json()) // para json

app.get('/personas', async (req, res) => {
  const { rol, limit } = req.query
  res.json(await um.buscarTodas({ rol, limit }))
})

app.post('/personas', async (req, res) => {
  console.log('recibí un POST')
  const { nombre, rol } = req.body
  try {
    const creada = await um.agregar({ nombre, rol })
    res.json(creada)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

app.put('/personas/:id', async (req, res) => {
  console.log('recibí un PUT')
  const { nombre, rol } = req.body
  const id = req.params.id
  try {
    const actualizada = await um.actualizar(id, { nombre, rol })
    res.json(actualizada)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

app.delete('/personas/:id', async (req, res) => {
  const id = req.params.id
  try {
    const borrado = await um.borrarPorId(id)
    res.json(borrado)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

app.get('/personas/:id', async (req, res) => {
  const id = req.params.id
  try {
    const buscada = await um.buscarPorId(id)
    res.json(buscada)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

app.get('/', async (req, res) => {
  res.sendFile('index.html', { root: './views' })
})

app.listen(8080, () => { console.log('conectado!') })