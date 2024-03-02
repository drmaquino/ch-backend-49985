import { usersService } from '../services/users.service.js'

export const usersPost = async (req, res, next) => {
  try {
    const user = await usersService.registrar(req.body)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

export const usersGet = async (req, res, next) => {
  try {
    const users = await usersService.obtenerTodos()
    res.jsonOk(users)
  } catch (error) {
    next(error)
  }
}
