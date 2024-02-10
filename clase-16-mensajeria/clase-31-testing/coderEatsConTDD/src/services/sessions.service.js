import { usersDao } from '../daos/index.js'

export class SessionsService {
  constructor(dao) {
    this.dao = dao
  }

  async login({ email, password }) {
    if (!email) throw new Error('error de autenticacion')
    if (!password) throw new Error('error de autenticacion')
    let user
    try {
      user = await this.dao.readOne({ email })
    } catch (error) {
      throw new Error('error de autenticacion')
    }
    if (user.password !== password) {
      throw new Error('error de autenticacion')
    }
    return {
      email
    }
  }
}

export const sessionsService = new SessionsService(usersDao)