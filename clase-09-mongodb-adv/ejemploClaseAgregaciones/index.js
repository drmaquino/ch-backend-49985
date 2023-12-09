import util from 'node:util'
import { randomUUID } from 'node:crypto'
import mongoose from 'mongoose'

import { Order } from './models/order.js'


await mongoose.connect('mongodb://localhost/coderhouse')

// elimino todo para asegurarme comenzar la prueba desde cero
console.log(await mongoose.connection.db.collection('orders').deleteMany({}))
console.log(await mongoose.connection.db.collection('reports').deleteMany({}))

const dataSet = [
  { name: 'Pepperoni', size: 'small', price: 10, quantity: 10, date: new Date().toLocaleString() },
  { name: 'Pepperoni', size: 'small', price: 10, quantity: 20, date: new Date().toLocaleString() },
  { name: 'Pepperoni', size: 'medium', price: 11, quantity: 20, date: new Date().toLocaleString() },
  { name: 'Pepperoni', size: 'medium', price: 11, quantity: 30, date: new Date().toLocaleString() },
  { name: 'Pepperoni', size: 'large', price: 12, quantity: 15, date: new Date().toLocaleString() },
  { name: 'Pepperoni', size: 'large', price: 12, quantity: 25, date: new Date().toLocaleString() },
  { name: 'Cheese', size: 'small', price: 13, quantity: 21, date: new Date().toLocaleString() },
  { name: 'Cheese', size: 'small', price: 13, quantity: 31, date: new Date().toLocaleString() },
  { name: 'Cheese', size: 'medium', price: 14, quantity: 24, date: new Date().toLocaleString() },
  { name: 'Cheese', size: 'medium', price: 14, quantity: 34, date: new Date().toLocaleString() },
  { name: 'Cheese', size: 'large', price: 15, quantity: 21, date: new Date().toLocaleString() },
  { name: 'Cheese', size: 'large', price: 15, quantity: 31, date: new Date().toLocaleString() },
  { name: 'Vegan', size: 'small', price: 16, quantity: 31, date: new Date().toLocaleString() },
  { name: 'Vegan', size: 'small', price: 16, quantity: 41, date: new Date().toLocaleString() },
  { name: 'Vegan', size: 'medium', price: 17, quantity: 5, date: new Date().toLocaleString() },
  { name: 'Vegan', size: 'medium', price: 17, quantity: 15, date: new Date().toLocaleString() },
]

// console.log(
await Order.insertMany(dataSet)
// )

// const reports =
await Order.aggregate([
  // me quedo con las pizzas medianas
  { $match: { size: 'medium' } },

  // agrupo por variedad, y acumulo las cantidades de cada variedad.
  // como id del nuevo documento uso el valor del campo compartido entre los documentos agrupados.
  { $group: { _id: '$name', totalQuantity: { $sum: '$quantity' } } },

  // ordeno por cantidad, de mayor a menor
  { $sort: { totalQuantity: -1 } },

  // meto todos los resultados en un array de ordenes.
  // esta vez como id del nuevo documento uso un nuevo valor generado al azar.
  {
    $group: {
      _id: randomUUID(),
      orders: {
        $push: {
          name: '$_id',
          quantity: '$totalQuantity',
        }
      }
    }
  },
  // { $group: { _id: randomUUID(), orders: { $push: '$$ROOT' } } },

  { $addFields: { date: new Date().toLocaleString() } },

  // inserto en la coleccion de reportes
  { $merge: { into: 'reports' } }
])

// // como esto es una prueba, 
// // para no crear el modelo, 
// // accedo al driver nativo de mongodb ^^
// // y reviso que se haya creado el reporte
const reports = await mongoose.connection.db.collection('reports').find().toArray()

// // uso util.inspect pq sino el console log
// // no me muestra objetos anidados con tanta profundidad
// // console.log(reports) // descomentar para ver lo que muestra
console.log(util.inspect(reports, false, 10))
// console.log(reports)

// desconecto para que el programa finalice correctamente
await mongoose.connection.close()