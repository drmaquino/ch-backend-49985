import { tiendasService } from '../services/index.js'

// registrar
export async function postController(req, res, next) {
  try {
    const tienda = await tiendasService.registrar(req.body)
    res.created(tienda)
  } catch (error) {
    next(error)
  }
}

// agregar juguete
export async function postJuguetesController(req, res, next) {
  try {
    await tiendasService.agregarJuguete(req.params.id, req.body.idJuguete)
    res.updated()
  } catch (error) {
    next(error)
  }
}