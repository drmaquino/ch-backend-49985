import { personasManager } from '../services/PersonasManager.js'

export async function getController(req, res) {
  const personas = await personasManager.findAll()
  console.log('buscar personas')
  res.json(personas)
}

export async function postController(req, res) {
  console.log('agregar persona')
  const persona = req.body
  console.log(persona)
  await personasManager.create(persona)
  res.json(persona)
}