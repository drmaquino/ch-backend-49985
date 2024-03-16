import { CreateUserDto } from '../dto/create-user.dto.js'

type Entity = { _id: string }
type UserData = CreateUserDto & Entity

export class User {
  #_id: string
  #nombre: string
  #apellido: string
  #email: string
  #password: string

  constructor(userData: UserData) {
    this.#_id = userData._id
    this.nombre = userData.nombre
    this.apellido = userData.apellido
    this.email = userData.email
    this.password = userData.password
  }

  get _id() { return this.#nombre }
  get nombre() { return this.#nombre }
  get apellido() { return this.#apellido }
  get email() { return this.#email }
  get password() { return this.#password }

  set nombre(value) {
    if (!value) {
      throw new Error(`"nombre" is required`)
    }
    this.#nombre = value
  }

  set apellido(value) {
    if (!value) {
      throw new Error(`"apellido" is required`)
    }
    this.#apellido = value
  }

  set email(value) {
    if (!value) {
      throw new Error(`"email" is required`)
    }
    this.#email = value
  }

  set password(value) {
    if (!value) {
      throw new Error(`"password" is required`)
    }
    this.#password = value
  }

  toPojo() {
    return {
      _id: this.#_id,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      password: this.password,
    }
  }
}
