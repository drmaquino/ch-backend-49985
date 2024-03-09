import fs from 'fs/promises'

export class MemoryDao {
  constructor(collName) {
    this.users = []
  }

  async createOne(userDto) {
    this.users.push(userDto)
  }

  async readOne(query) {
    const buscado = this.users.find(u => {
      for (const clave in query) {
        if (!u[clave] || u[clave] !== query[clave]) {
          return false
        }
      }
      return true
    })
    return buscado
  }

  async readMany(query) {
    throw new Error('NOT IMPLEMENTED')
  }

  async updateOne() {
    throw new Error('NOT IMPLEMENTED')
  }

  async udpateMany() {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteOne() {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteMany() {
    throw new Error('NOT IMPLEMENTED')
  }

}