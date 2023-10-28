// const nacimiento = new Date('2000/6/1')
// // console.log(nacimiento.toString())
// // console.log(nacimiento.getTime())
// // console.log(nacimiento.getFullYear())
// // console.log(nacimiento.getHours())
// //timestamp: milisegundos desde 1/1/1970H00:00

// const milisAhora = Date.now() // new Date().getTime()
// const milisNacimiento = nacimiento.getTime()
// const diff = milisAhora - milisNacimiento

// console.log(diff / 1000 / 60 / 60 / 24)

// console.log(365 * 23)

import moment from 'moment'

const hoy = moment()
//Colocar la fecha en formato YYYY-MM-DD
// const fechaNacimiento = moment('2000-06-01', 'YYYY-MM-DD') //Prueba metiendo después el mes 200 !
const fechaNacimiento = moment('1986-04-15', 'YYYY-MM-DD') //Prueba metiendo después el mes 200 !

console.log(hoy)
console.log(fechaNacimiento)

if (fechaNacimiento.isValid()) {
  console.log(`Desde mi nacimiento, han pasado ${hoy.diff(fechaNacimiento, 'days')} días`)
} else {
  console.error("No se puede proseguir ya que la fecha es inválida")
}