import { randomUUID } from 'node:crypto'
import fs from 'fs/promises'
import { matches } from '../utils.js'

class Juguete {
  #_id
  #nombre
  #precio
  constructor({ _id = randomUUID(), nombre, precio }) {
    this.#_id = _id
    this.nombre = nombre
    this.precio = precio
  }

  get _id() { return this.#_id }
  get nombre() { return this.#nombre }
  get precio() { return this.#precio }

  set nombre(value) {
    if (!value) throw new Error('el nombre es obligatorio')
    this.#nombre = value
  }

  set precio(value) {
    if (!value) throw new Error('el precio es obligatorio')
    if (value <= 0) throw new Error('el precio debe ser positivo')
    this.#precio = value
  }

  toObject() {
    return {
      _id: this.#_id,
      nombre: this.#nombre,
      precio: this.#precio,
    }
  }
}

class JuguetesDaoFiles {

  constructor(path) {
    this.path = path
  }

  async #readJuguetes() {
    return JSON.parse(await fs.readFile(this.path, 'utf-8'))
  }

  async #writeJuguetes(juguetes) {
    await fs.writeFile(this.path, JSON.stringify(juguetes, null, 2))
  }

  async create(data) {
    const juguete = new Juguete(data)
    const juguetes = await this.#readJuguetes()
    juguetes.push(juguete.toObject())
    await this.#writeJuguetes(juguetes)
    return juguete.toObject()
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

const juguetesDaoFiles = new JuguetesDaoFiles('./db/juguetes.json')
console.log('usando persistencia en sistema de archivos')

export async function getDaoFiles() {
  return juguetesDaoFiles
}