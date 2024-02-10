import { randomUUID } from 'node:crypto'

export class Juguete {
  #_id
  #nombre
  #precio
  constructor({ _id = randomUUID(), nombre, precio }) {
    this.#_id = _id
    this.nombre = nombre
    this.precio = precio
  }

  get _id() { return this.#_id }
  get nombre() { return this.#nombre }
  get precio() { return this.#precio }

  set nombre(value) {
    if (!value) throw new Error('el nombre es obligatorio')
    this.#nombre = value
  }

  set precio(value) {
    if (!value) throw new Error('el precio es obligatorio')
    if (value <= 0) throw new Error('el precio debe ser positivo')
    this.#precio = value
  }

  toPOJO() {
    return {
      _id: this.#_id,
      nombre: this.#nombre,
      precio: this.#precio,
    }
  }
}