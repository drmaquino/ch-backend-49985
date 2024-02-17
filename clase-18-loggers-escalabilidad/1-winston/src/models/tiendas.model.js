import { randomUUID } from 'node:crypto'
import { ErrorType, newError } from '../errors/errors.js'

export class Tienda {
  #_id
  #nombre
  #juguetes
  constructor({ _id = randomUUID(), nombre }) {
    this.#_id = _id
    this.nombre = nombre
    this.#juguetes = []
  }

  get _id() { return this.#_id }
  get nombre() { return this.#nombre }
  get juguetes() { return this.#juguetes }

  set nombre(value) {
    if (!value) throw newError(ErrorType.INVALID_DATA ,'el nombre es obligatorio')
    this.#nombre = value
  }

  toPOJO() {
    return {
      _id: this.#_id,
      nombre: this.#nombre,
      juguetes: this.#juguetes
    }
  }
}
