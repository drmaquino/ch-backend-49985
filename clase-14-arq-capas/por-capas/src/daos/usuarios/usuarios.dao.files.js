import { randomUUID } from 'node:crypto'
import fs from 'fs/promises'
import { matches } from '../utils.js'

class Usuario {
  #_id
  #nombre
  constructor({ _id = randomUUID(), nombre }) {
    this.#_id = _id
    this.nombre = nombre
  }

  get _id() { return this.#_id }
  get nombre() { return this.#nombre }

  set nombre(value) {
    if (!value) throw new Error('el nombre es obligatorio')
    this.#nombre = value
  }

  toObject() {
    return {
      _id: this.#_id,
      nombre: this.#nombre,
    }
  }
}

class UsuariosDaoFiles {

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
    const usuarios = await this.#readUsuarios()
    usuarios.push(usuario.toObject())
    await this.#writeUsuarios(usuarios)
    return usuario.toObject()
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

const usuariosDaoFiles = new UsuariosDaoFiles('./db/usuarios.json')
console.log('usando persistencia en sistema de archivos')

export async function getDaoFiles() {
  return usuariosDaoFiles
}