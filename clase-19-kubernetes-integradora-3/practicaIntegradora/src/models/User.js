import { randomUUID } from 'crypto'
import { DEFAULT_USER_AVATAR_PATH, DEFAULT_ROLE } from '../config/config.js'

export class User {
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