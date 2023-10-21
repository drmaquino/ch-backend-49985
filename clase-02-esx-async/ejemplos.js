//spread

// const arr = [1, 2, 3, 4, 5, 6]
// // ...[1,2,3,4,5,6] -> 1,2,3,4,5,6

// function sumar(param1, param2, param3, param4, param5, param6) {
//   return param1 + param2 + param3 + param4 + param5 + param6
// }

// sumar(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5])

// console.log(sumar(...arr))
// // console.log(sumar(...[1, 2, 3, 4, 5, 6]))
// // console.log(sumar(1, 2, 3, 4, 5, 6))

// //-------------------------------------------------

// // ...{ nombre: 'pepe', edad: 35 } -> 
// // nombre: 'pepe',
// // edad: 35

// const persona =
// {
//   nombre: 'pepe',
//   edad: 35
// }

// const np = {
//   ...persona,
//   direccion: 'en casa',
//   edad: 40
// }

// // const np = {
// //   nombre: persona.nombre,
// //   edad: persona.edad,
// //   direccion: 'en casa',
// //   edad: 40,
// // }

// // const np = {
// //   nombre: 'pepe',
// //   edad: 40,
// //   direccion: 'en casa'
// // }

// console.log(np)

// const personas = [
//   { dni: '1', nombre: 'toto1', edad: 20, pais: 'arg' },
//   { dni: '2', nombre: 'toto2', edad: 20, pais: 'arg' },
//   { dni: '3', nombre: 'toto3', edad: 20, pais: 'arg' },
//   { dni: '4', nombre: 'toto4', edad: 20, pais: 'arg' },
// ]

// function actualizar(dni, datos) {
//   const ip = personas.findIndex(p => p.dni === dni)
//   personas[ip] = {
//     ...personas[ip],
//     ...datos
//   }
// }

// console.log(personas)
// actualizar('3', { edad: 22, pais: 'japon' })
// console.log(personas)

// rest

// function mostrarCosas(param1, param2, ...cosas) {
//   console.log('param1: ' + param1)
//   console.log('param2: ' + param2)

//   console.log('el resto:')
//   for (const cosa of cosas) {
//     console.log(cosa)
//   }
// }

// mostrarCosas(1, 2, 3, 4, 5, 6, 7, 8)

// Array.flat

// const arr = [1, 2, 3, [4, 5, 6], [7, 8, 9, [10, 11, 12]]]
// console.log(arr.flat()) // profundidad por defecto: 1
// console.log(arr.flat(2))

// const dptos = [
//   // torre 1
//   [
//     // piso 1
//     [
//       //dpto 1
//       { prop: 'yo' },
//       //dpto 2
//       { prop: 'yo' },
//       //dpto 3
//       { prop: 'yo' },
//     ],
//     // piso 2
//     [
//       //dpto 1
//       { prop: 'yo' },
//       //dpto 2
//       { prop: 'yo' },
//       //dpto 3
//       { prop: 'yo' },
//     ]
//   ],
//   // torre 2
//   [
//     // piso 1
//     [
//       //dpto 1
//       { prop: 'yo' },
//       //dpto 2
//       { prop: 'yo' },
//       //dpto 3
//       { prop: 'yo' },
//     ],
//     // piso 2
//     [
//       //dpto 1
//       { prop: 'yo' },
//       //dpto 2
//       { prop: 'yo' },
//       //dpto 3
//       { prop: 'yo' },
//     ]
//   ]
// ]

// console.log(dptos[0][1][1])
// console.log(dptos.flat(3))

// // nullsh coalescense

// let p = {
//   nombre: 'ramon'
// }

// // hago cosas

// const unnombre = p.name ?? 'anonimo'

// console.log(unnombre)

// console.log('hola' || 12345)
// console.log('' || 12345)
// console.log('' ?? 12345)
// console.log(0 || 12345)
// console.log(0 ?? 12345)

// console.log(false || undefined)

// criterio de cortocircuito:

// falso OR cualquier cosa -> lo que esta a la derecha del OR
// verdadero OR cualquier cosa -> lo que esta a la izquierda del OR
