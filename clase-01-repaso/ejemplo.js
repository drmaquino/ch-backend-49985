// function main(params) {
//   let acum = 0
//   for (let i = 0; i < 10; i++) {
//     const pepe = 5
//     console.log(i)
//     acum += i
//   }
//   console.log(acum)
//   console.log(pepe)
// }

// main()

// const persona = { nombre: 'marian' }

// // persona = 'pepe'

// persona.nombre = 'jacinto'

// console.log(persona)

// const arr = [1, 2, 3, 4]
// arr.push(5)

// // arr = []

// console.log(`hola, me llamo, "${persona.nombre}"
// esto es 'otra' linea
// y esto es otra linea mas`)

// console.log('hola, me llamo, "' + persona.nombre + '"\n' +
//   "esto es 'otra' linea\n" +
//   'y esto es \'otra linea mas')

// main()

// function main() {
//   saludar()
//   despedirse()
// }

// function saludar() {
//   console.log('hola')
// }

// function despedirse() {
//   console.log('chau')
// }

// const numeros = [1, 2, 3, 4, 5, 6, 7]

// function mostrarElem(elem) {
//   console.log(elem)
// }
// numeros.forEach(mostrarElem)

// numeros.forEach(n => console.log(n))

// recursividad. no lo vamos a ver.
// let num = 10
// function restarUnoYMostrar() {
//   console.log(num)
//   num -= 1
//   if (num > 0) {
//     restarUnoYMostrar()
//   }
// }
// restarUnoYMostrar()

// funcion de orden superior: una funcion que recibe o devuelve otra funcion

// la funcion que es argumento de otra funcion se la conoce como callback
// la funcion que es resultado de otra funcion, bajo algundiciones especiales, sera una clausura

// function crearMostrarPresentacion(nombre) {

//   const firma = `(${nombre.toUpperCase()})`

//   function mostrarPresentacion() {
//     console.log(`hola mundo! me llamo ${nombre}. ${firma}`)
//   }

//   // devuelve una clausura con la funcion y el contexto {nombre,firma}
//   return mostrarPresentacion
// }

// const f = crearMostrarPresentacion('fernando')
// const g = crearMostrarPresentacion('gerardo')
// const h = crearMostrarPresentacion('hector')

// f()
// g()
// h()

// ejemplo clausuras real
// const carrito = []

// document.querySelector("#btnAgregarAlCarrito")?.addEventListener('click', event => {
//   // @ts-ignore
//   const idProducto = event?.target?.id
//   carrito.push(idProducto)
// })

// -------------------------------------------------------

// clases

// const nombre1 = 'marian'
// const edad1 = 90

// function saludar1() {
//   console.log(nombre1)
// }

// const nombre2 = 'marian'
// const edad2 = 90

// function saludar2() {
//   console.log(nombre2)
// }

class Persona {
  static cantidadCreada = 0

  constructor(nombre, edad) {
    // const this = {}
    this.nombre = nombre
    this.edad = edad
    Persona.cantidadCreada++
    // return this
  }

  saludar() {
    console.log(this.nombre)
  }

  static mostrarCantidadCreada() {
    console.log(`se crearon ${Persona.cantidadCreada} personas`)
  }
}

const p = new Persona('marian', 90)
const g = new Persona('german', 80)

console.log(p)
p.saludar()

console.log(g)
g.saludar()

console.log(Persona)

Persona.mostrarCantidadCreada()