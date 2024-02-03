import fs from 'fs/promises'
import { matches } from '../../utils.js'

export class TiendasDaoFiles {

  constructor(path) {
    this.path = path
  }

  async #readFile() {
    return JSON.parse(await fs.readFile(this.path, 'utf-8'))
  }

  async #writeFile(usuarios) {
    await fs.writeFile(this.path, JSON.stringify(usuarios, null, 2))
  }

  async create(tiendaPojo) {
    const tiendas = await this.#readFile()
    tiendas.push(tiendaPojo)
    await this.#writeFile(tiendas)
    return tiendaPojo
  }

  async readOne(query) {
    const tiendas = await this.#readFile()
    const buscado = tiendas.find(matches(query))
    return buscado
  }

  async readMany(query) {
    throw new Error('NOT IMPLEMENTED')
  }

  async updateOne(query, data) {
    const tiendas = await this.#readFile()
    const indexBuscado = tiendas.findIndex(matches(query))
    if (indexBuscado !== -1) {
      const nuevo = {
        ...tiendas[indexBuscado],
        ...data
      }
      tiendas[indexBuscado] = nuevo
      await this.#writeFile(tiendas)
      return nuevo
    }
    return null
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
