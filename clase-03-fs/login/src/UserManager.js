import fs from 'fs/promises'
import { Usuario } from './Usuario.js'

export class UserManager {
  #ruta

  constructor(ruta) {
    this.#ruta = ruta
  }
  async agregar(datosUsuario) {
    const usuarios = JSON.parse(await fs.readFile(this.#ruta, 'utf-8'))
    const usuario = new Usuario(datosUsuario, true)
    usuarios.push(usuario)
    await fs.writeFile(this.#ruta, JSON.stringify(usuarios.map(u => u.toPOJO()), null, 2))
    return usuario
  }

  async login(username, password) {
    const pojos = JSON.parse(await fs.readFile(this.#ruta, 'utf-8'))

    const pojo = pojos.find(u => u.username === username)
    if (!pojo) {
      throw new Error('credenciales invalidas')
    }

    const usuario = new Usuario(pojo)
    if (!usuario.validar(password)) {
      throw new Error('credenciales invalidas')
    }

    return pojo
  }

  async reset() {
    await fs.writeFile(this.#ruta, '[]')
  }
}

