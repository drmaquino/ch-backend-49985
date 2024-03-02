import { usersService } from '../services/users.service.js'

export const sessionsPost = async (req, res, next) => {
  try {
    const user = await usersService.autenticar(req.body)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}