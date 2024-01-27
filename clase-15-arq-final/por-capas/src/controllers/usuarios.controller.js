import { usuariosService } from '../services/usuarios.service.js'

// registrar
export async function postController(req, res, next) {
  try {
    const usuario = await usuariosService.registrar(req.body)
    res.result(usuario)
  } catch (error) {
    next(error)
  }
}

// dar de baja
export async function deleteController(req, res, next) {
  try {
    await usuariosService.darDeBaja(req.params.id)
    res.deleted()
  } catch (error) {
    next(error)
  }
}