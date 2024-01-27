import fs from 'fs/promises'
import { matches } from '../../utils.js'
import { Usuario } from './usuario.model.files.js'

export class UsuariosDaoFiles {

  constructor(path) {
    this.path = path
  }

  async #readUsuarios() {
    return JSON.parse(await fs.readFile(this.path, 'utf-8'))
  }

  async #writeUsuarios(usuarios) {
    await fs.writeFile(this.path, JSON.stringify(usuarios, null, 2))
  }

  async create(data) {
    const usuario = new Usuario(data)
    const userPojo = usuario.toPOJO()
    const usuarios = await this.#readUsuarios()
    usuarios.push(userPojo)
    await this.#writeUsuarios(usuarios)
    return userPojo
  }

  async readOne(query) {
    const usuarios = await this.#readUsuarios()
    const buscado = usuarios.find(matches(query))
    return buscado
  }

  async readMany(query) {
    const usuarios = await this.#readUsuarios()
    const buscados = usuarios.filter(matches(query))
    return buscados
  }

  async updateOne(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async updateMany(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteOne(query) {
    const usuarios = await this.#readUsuarios()
    const indexBuscado = usuarios.findIndex(matches(query))
    if (indexBuscado !== -1) {
      const [buscado] = usuarios.splice(indexBuscado, 1)
      await this.#writeUsuarios(usuarios)
      return buscado
    }
    return null
  }

  async deleteMany(query) {
    throw new Error('NOT IMPLEMENTED')
  }
}
