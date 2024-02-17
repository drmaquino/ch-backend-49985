import { faker } from '@faker-js/faker/locale/es'

function crearUsuarioMock() {
  return {
    _id: faker.string.uuid(),
    nombre: faker.person.fullName(),
    email: faker.internet.email(),
  }
}

export class UsuariosDaoMock {

  constructor() {
    this.usuarios = []
  }

  async create(userPojo) {
    throw new Error('NOT IMPLEMENTED')
  }

  async readOne() {
    throw new Error('NOT IMPLEMENTED')
  }

  async readMany() {
    const usuarios = []
    for (let i = 0; i < 10; i++) {
      usuarios.push(crearUsuarioMock())
    }
    return usuarios
  }

  async updateOne(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async updateMany(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteOne(query) {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteMany(query) {
    throw new Error('NOT IMPLEMENTED')
  }
}
