export class Usuario {
  constructor({ id, nombre, roles }) {
    this.id = id
    this.nombre = nombre
    this.roles = roles
  }

  agregarRol(rol) {
    if (!this.roles.includes(rol)) {
      this.roles.push(rol)
    }
  }

  toPOJO() {
    return {
      id: this.id,
      nombre: this.nombre,
      roles: this.roles,
    }
  }
}
