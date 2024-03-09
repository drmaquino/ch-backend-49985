import { usersDao } from '../daos/users.dao.mongodb.js'
import { User } from '../models/User.js'
import { hasheadasSonIguales, hashear } from '../utils/criptografia.js'
import { emailService } from './email/email.service.js'

export class UsersService {

  constructor({ usersDao, criptografia, emailService }) {
    this.usersDao = usersDao
    this.criptografia = criptografia
    this.emailService = emailService
  }

  async registrar(userData) {
    try {
      if (userData.password) {
        userData.password = await this.criptografia.hashear(userData.password)
      }
      delete userData.rol

      const user = new User(userData)

      await this.usersDao.createOne(user.toPojo())

      await this.emailService.send(user.email, 'bienvenida', 'gracias por registrarse!')

      return user.toPojo()
    } catch (error) {
      const typedError = new Error(error.message)
      typedError['type'] = 'INVALID_ARGUMENT'
      throw typedError
    }
  }

  async obtenerTodos() {
    return await this.usersDao.readMany({})
  }

  async autenticar({ username, password }) {
    const user = await this.usersDao.readOne({ username })
    if (!user) {
      const typedError = new Error('error de autenticacion')
      typedError['type'] = 'FAILED_AUTHENTICATION'
      throw typedError
    }
    if (!this.criptografia.hasheadasSonIguales(password, user.password)) {
      const typedError = new Error('error de autenticacion')
      typedError['type'] = 'FAILED_AUTHENTICATION'
      throw typedError
    }
    return user
  }
}

export const usersService = new UsersService({
  usersDao,
  criptografia: { hasheadasSonIguales, hashear },
  emailService
}) 