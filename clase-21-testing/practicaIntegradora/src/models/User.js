import { randomUUID } from 'crypto'
import { DEFAULT_USER_AVATAR_PATH, DEFAULT_ROLE } from '../config/config.js'

export class User {

  #username
  #password
  #fullName
  #email

  constructor({
    _id,
    username,
    password,
    fullName,
    email,
    foto,
    rol,
  }) {
    this._id = _id || randomUUID()
    this.username = username
    this.password = password
    this.fullName = fullName
    this.email = email
    this.foto = foto || DEFAULT_USER_AVATAR_PATH
    this.rol = rol || DEFAULT_ROLE
  }

  get username() { return this.#username }
  get password() { return this.#password }
  get fullName() { return this.#fullName }
  get email() { return this.#email }

  set username(value) {
    if (!value) {
      throw new Error('missing required value')
    }
    this.#username = value
  }

  set password(value) {
    if (!value) {
      throw new Error('missing required value')
    }
    this.#password = value
  }

  set fullName(value) {
    if (!value) {
      throw new Error('missing required value')
    }
    this.#fullName = value
  }

  set email(value) {
    if (!value) {
      throw new Error('missing required value')
    }
    this.#email = value
  }

  toPojo() {
    return {
      _id: this._id,
      username: this.username,
      password: this.password,
      fullName: this.fullName,
      email: this.email,
      foto: this.foto,
      rol: this.rol,
    }
  }
}