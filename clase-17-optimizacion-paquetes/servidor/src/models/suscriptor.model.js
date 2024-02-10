import { ErrorType, newError } from '../errors/errors.js'

export class Suscriptor {
  #email
  constructor({ email }) {
    this.email = email
  }

  get email() { return this.#email }

  set email(value) {
    if (!value) throw newError(ErrorType.INVALID_DATA, 'email es nu campo obligatorio')
    this.#email = value
  }

  toPOJO() {
    return {
      email: this.#email
    }
  }
}