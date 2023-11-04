import fs from 'node:fs/promises'
import { Usuario } from './Usuario.js'
import { randomUUID } from 'node:crypto'

export class UserManager {
  #ruta

  constructor(ruta) {
    this.#ruta = ruta
  }

  async agregar({ nombre, rol }) {
    const pojos = JSON.parse(await fs.readFile(this.#ruta, 'utf-8'))

    const usuario = new Usuario({
      id: randomUUID(),
      nombre,
      roles: [rol]
    })

    const pojoCreado = usuario.toPOJO()
    pojos.push(pojoCreado)
    await fs.writeFile(this.#ruta, JSON.stringify(pojos, null, 2))

    return pojoCreado
  }

  async buscarPorId(id) {
    const pojos = JSON.parse(await fs.readFile(this.#ruta, 'utf-8'))

    const pojo = pojos.find(p => p.id === id)
    if (!pojo) {
      throw new Error(`usuario con id ${id} no encontrado`)
    }

    return pojo
  }

  async buscarTodas({ rol, limit }) {
    const pojos = JSON.parse(await fs.readFile(this.#ruta, 'utf-8'))
    let result
    if (rol) {
      result = pojos.filter(p => p.roles.includes(rol))
    } else {
      result = pojos
    }

    if (limit) {
      return result.slice(0, limit)
    } else {
      return result
    }
  }

  async actualizar(id, campos) {
    const pojos = JSON.parse(await fs.readFile(this.#ruta, 'utf-8'))

    const buscadoIndex = pojos.findIndex(p => p.id === id)
    if (buscadoIndex === -1) {
      throw new Error(`usuario con id ${id} no encontrado`)
    }



    const datosActualizados = {
      ...pojos[buscadoIndex],
      ...campos
    }

    const actualizada = new Usuario(datosActualizados)

    if (campos.rol) {
      actualizada.agregarRol(campos.rol)
    }

    const pojoActualizado = actualizada.toPOJO()
    pojos[buscadoIndex] = pojoActualizado
    await fs.writeFile(this.#ruta, JSON.stringify(pojos, null, 2))

    return pojoActualizado
  }

  async borrarPorId(id) {
    const pojos = JSON.parse(await fs.readFile(this.#ruta, 'utf-8'))

    const pojoIndex = pojos.findIndex(p => p.id === id)
    if (pojoIndex === -1) {
      throw new Error(`usuario con id ${id} no encontrado`)
    }

    const [borrado] = pojos.splice(pojoIndex, 1)
    await fs.writeFile(this.#ruta, JSON.stringify(pojos, null, 2))

    return borrado
  }

  async reset() {
    await fs.writeFile(this.#ruta, '[]')
  }
}

