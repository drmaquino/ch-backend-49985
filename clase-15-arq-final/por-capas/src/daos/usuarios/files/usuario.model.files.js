import { randomUUID } from 'node:crypto'

export class Usuario {
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

  toPOJO() {
    return {
      _id: this.#_id,
      nombre: this.#nombre,
    }
  }
}
