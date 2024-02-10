import { newslettersService } from '../services/index.js'

// suscribirse
export async function postController(req, res, next) {
  try {
    const suscriptor = await newslettersService.suscribirse(req.body)
    res.created(suscriptor)
  } catch (error) {
    next(error)
  }
}

// desuscribirse
export async function deleteController(req, res, next) {
  try {
    await newslettersService.desuscribirse(req.body)
    res.deleted()
  } catch (error) {
    next(error)
  }
}


// para pruebas!! luego se hace un cron job

// enviar newsletters
export async function postEnviarController(req, res, next) {
  try {
    await newslettersService.enviar()
    res.ok()
  } catch (error) {
    next(error)
  }
}