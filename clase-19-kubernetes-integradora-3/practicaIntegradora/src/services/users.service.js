import { usersDao } from '../daos/users.dao.mongodb.js'
import { User } from '../models/User.js'
import { hasheadasSonIguales, hashear } from '../utils/criptografia.js'
import { emailService } from './email/email.service.js'

class UsersService {
  async registrar(userData) {
    try {
      if (userData.password) {
        userData.password = await hashear(userData.password)
      }
      delete userData.rol

      const user = new User(userData)

      await usersDao.createOne(user.toPojo())

      await emailService.send(user.email, 'bienvenida', 'gracias por registrarse!')

      return user.toPojo()
    } catch (error) {
      const typedError = new Error(error.message)
      typedError['type'] = 'INVALID_ARGUMENT'
      throw typedError
    }
  }

  async obtenerTodos() {
    return await usersDao.readMany({})
  }

  async autenticar({ username, password }) {
    const user = await usersDao.readOne({ username })
    if (!user) {
      const typedError = new Error('error de autenticacion')
      typedError['type'] = 'FAILED_AUTHENTICATION'
      throw typedError
    }
    if (!hasheadasSonIguales(password, user.password)) {
      const typedError = new Error('error de autenticacion')
      typedError['type'] = 'FAILED_AUTHENTICATION'
      throw typedError
    }
    return user
  }
}

export const usersService = new UsersService() 