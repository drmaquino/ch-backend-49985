import { juguetesService } from '../services/juguetes.service.js'

export async function getController(req, res, next) {
  try {
    const juguetes = await juguetesService.obtenerJuguetes()
    res.result(juguetes)
  } catch (error) {
    next(error)
  }
}

export async function postController(req, res, next) {
  try {
    const juguete = await juguetesService.agregarJuguete(req.body)
    res.created(juguete)
  } catch (error) {
    next(error)
  }
}