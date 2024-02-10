import { randomUUID } from 'node:crypto'
import { newError, newInvalidDataError } from '../errors/errors.js'

export class Usuario {
  #_id
  #nombre
  #email
  constructor({ _id = randomUUID(), nombre, email }) {
    this.#_id = _id
    this.nombre = nombre
    this.email = email
  }

  get _id() { return this.#_id }
  get nombre() { return this.#nombre }
  get email() { return this.#email }

  set nombre(value) {
    if (!value) throw newInvalidDataError('el nombre es obligatorio')
    this.#nombre = value
  }

  set email(value) {
    if (!value) throw newInvalidDataError('el email es obligatorio')
    this.#email = value
  }

  toPOJO() {
    return {
      _id: this.#_id,
      nombre: this.#nombre,
      email: this.#email,
    }
  }
}
