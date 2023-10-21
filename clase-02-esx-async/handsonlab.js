function notNull(valor, etiqueta) {
  if (valor === null || valor === undefined) {
    throw new Error(`el valor de ${etiqueta} no puede ser null`)
  }
  return valor
}

class Evento {
  #capacidad
  #participantes
  #precio
  constructor({ id, nombre, lugar, precio, capacidad = 50, fecha = new Date() }) {
    this.id = notNull(id, 'id')
    this.nombre = notNull(nombre, 'nombre')
    this.lugar = notNull(lugar, 'lugar')
    this.precio = notNull(precio, 'precio')
    this.capacidad = capacidad
    this.fecha = fecha
    this.#participantes = []
  }

  agregarParticipante(idUsuario) {
    if (this.#participantes.includes(idUsuario)) throw new Error(`el usuario con id ${idUsuario} ya esta registrado para este evento`)
    this.#participantes.push(idUsuario)
  }

  get precio() {
    return this.#precio
  }

  set precio(nuevoPrecio) {
    if (nuevoPrecio <= 0) throw new Error('el precio debe ser mayor a 0')
    this.#precio = nuevoPrecio
  }

  get capacidad() {
    return this.#capacidad
  }

  set capacidad(nuevaCapacidad) {
    if (nuevaCapacidad <= 0) throw new Error('la capacidad debe ser mayor a 0')
    this.#capacidad = nuevaCapacidad
  }

  get participantes() {
    return [...this.#participantes]
  }

  asPOJO() { // Plain Old JAvascript Object, o sea, un {}
    return {
      id: this.id,
      nombre: this.nombre,
      lugar: this.lugar,
      precio: this.precio,
      capacidad: this.capacidad,
      fecha: this.fecha,
      participantes: this.participantes
    }
  }
}

let id = 1
function generarId() {
  return id++
}

class ManagerEventos {
  #eventos
  constructor() {
    this.#eventos = []
  }

  agregarEvento(datosEvento) {
    datosEvento.id = generarId()
    const evento = new Evento(datosEvento)
    this.#eventos.push(evento)
    return evento.asPOJO()
  }

  ponerEventoEnGira({ idEvento, nuevaLocalidad, nuevaFecha }) {
    const eventoOriginal = this.#eventos.find(e => e.id === idEvento)
    if (!eventoOriginal) throw new Error(`el evento con id ${idEvento} no existe`)
    const nuevoEvento = new Evento({
      ...eventoOriginal.asPOJO(),
      id: generarId(),
      lugar: nuevaLocalidad,
      fecha: nuevaFecha
    })
    this.#eventos.push(nuevoEvento)
    return nuevoEvento.asPOJO()
  }


  agregarUsuario({ idEvento, idUsuario }) {
    const evento = this.#eventos.find(e => e.id === idEvento)
    if (!evento) throw new Error(`el evento con id ${idEvento} no existe`)
    evento.agregarParticipante(idUsuario)
  }

  get eventos() {
    return this.#eventos.map(e => e.asPOJO())
  }
}

const em = new ManagerEventos()

const datosEvento = {
  nombre: 'mi cumple',
  lugar: 'mi casa',
  precio: 50_000,
}

em.agregarEvento(datosEvento)
console.log(em.eventos)

em.agregarUsuario({ idEvento: 1, idUsuario: 123 })
console.log(em.eventos)

em.ponerEventoEnGira({ idEvento: 1, nuevaLocalidad: 'una plaza', nuevaFecha: new Date('2023/12/24') })
console.log(em.eventos)
