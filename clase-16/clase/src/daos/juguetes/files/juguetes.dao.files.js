import fs from 'fs/promises'
import { matches } from '../../utils.js'

export class JuguetesDaoFiles {

  constructor(path) {
    this.path = path
  }

  async #readJuguetes() {
    return JSON.parse(await fs.readFile(this.path, 'utf-8'))
  }

  async #writeJuguetes(juguetes) {
    await fs.writeFile(this.path, JSON.stringify(juguetes, null, 2))
  }

  async create(juguetePojo) {
    const juguetes = await this.#readJuguetes()
    juguetes.push(juguetePojo)
    await this.#writeJuguetes(juguetes)
    return juguetePojo
  }

  async readOne(query) {
    const juguetes = await this.#readJuguetes()
    const buscado = juguetes.find(matches(query))
    return buscado
  }

  async readMany(query) {
    const juguetes = await this.#readJuguetes()
    const buscados = juguetes.filter(matches(query))
    return buscados
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
