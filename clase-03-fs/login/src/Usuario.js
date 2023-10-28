import crypto from 'crypto'

export class Usuario {
  #password
  constructor({ nombre, apellido, username, password }, encriptar = false) {
    this.nombre = nombre
    this.apellido = apellido
    this.username = username
    this.#password = encriptar ? this.#encriptarContrasenia(password) : password
  }

  #encriptarContrasenia(password) {
    return 'SECRETO' + password
  }

  validar(password) {
    return this.#encriptarContrasenia(password) === this.#password
  }

  toPOJO() {
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      username: this.username,
      password: this.#password,
    }
  }
}
