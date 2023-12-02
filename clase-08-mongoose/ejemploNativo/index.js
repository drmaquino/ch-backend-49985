import { dbPersonas } from './mongodb/mongodb.js'

async function getPersonasController(req, res) {
  const personas = await dbPersonas.find().toArray()
  res.json(personas)
}

