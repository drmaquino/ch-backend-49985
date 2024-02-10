import { sessionsService } from '../services/sessions.service.js'

export async function handlePost(req, res, next) {
  try {
    res.status(201).json(await sessionsService.login(req.body))
  } catch (error) {
    next(error)
  }
}
