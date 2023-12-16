import mongoose from 'mongoose'
import { randomUUID } from 'crypto'
import { inspect } from 'util'

await mongoose.connect('mongodb://localhost/coderhouse')

const productSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  name: { type: String, required: true },
  price: { type: Number, min: 0, default: 0, required: true }
}, { versionKey: false })

const Product = mongoose.model('products', productSchema)

await Product.deleteMany({})

const prod1 = await Product.create({ name: "Product A", price: 100 })
const prod2 = await Product.create({ name: "Product B", price: 200 })
const prod3 = await Product.create({ name: "Product C", price: 300 })

// ----------------------------------

const cartSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  products: {
    type: [
      {
        product: { type: String, ref: 'products' },
        quantity: { type: Number, min: 1, default: 1 }
      }
    ],
    default: []
  }
}, {
  versionKey: false,
  strict: 'throw',
  methods: {
    updateQuantity: async function (prodId, quantity) {
      const prods = this.products.toObject()
      const prodIndex = prods.findIndex(p => p.product === prodId)
      if (prodIndex !== -1) {
        if (quantity === 0) {
          prods.splice(prodIndex, 1)
        } else {
          prods[prodIndex] = quantity
        }
      } else if (quantity > 0) {
        prods.push({
          product: prodId,
          quantity
        })
      }
      this.products = prods
      await this.save()
    },
    updateQuantity2: async function (prodId, quantity) {
      this.products.pull({ product: prodId })
      await this.save()
      if (quantity > 0) {
        this.products.push({ product: prodId, quantity })
        await this.save()
      }
      return this
    },
  }
})

const Cart = mongoose.model('carts', cartSchema)

await Cart.deleteMany({})

const cart1 = await Cart.create({})
// const cart2 = await Cart.create({})

await Cart.findByIdAndUpdate(cart1._id, { $push: { products: { product: prod1._id } } })
await Cart.findByIdAndUpdate(cart1._id, { $push: { products: { product: prod2._id } } })

// await Cart.findByIdAndUpdate(cart2._id, { $push: { products: { product: prod2._id } } })
// await Cart.findByIdAndUpdate(cart2._id, { $push: { products: { product: prod3._id } } })

await cart1.updateQuantity(prod1._id, 6)
await cart1.updateQuantity(prod2._id, 2)
await cart1.updateQuantity(prod3._id, 10)

// console.log(cart1.toJSON())

//------------------------

// populate version mongoose:

const result1 = await Cart.find({
  // aca va el filtro, si hay alguno
}, {
  // esta es la proyeccion. acá elimino el campo '_id'
  // que agrega solito mongoose a cada producto en el carrito!
  'products._id': 0
})
  // acá señalo cual es el campo que tiene que se reemplazado
  // por la consulta a la otra coleccion (indicada como ref en el modelo)
  .populate('products.product')
  // acá indico que debe devolver POJOs
  .lean()

// así queda en una sola linea sin tanto comentario. no hace falta descomentar.
// await Cart.find({}, { 'products._id': 0 }).populate('products.product').lean()

console.log(inspect(result1, false, 10))

// -----------------------

// populate usando el operador nativo $lookup en una agregación

// const result2 = await Cart.aggregate([
//   {
//     $lookup: {
//       from: 'products', // de qué coleccion saco los prods del carrito?
//       localField: 'products.product', // de qué campo saco el id de los prods?
//       foreignField: '_id', // contra qué campo de la coll de prods comparo los ids en el carrito?
//       as: 'products', // en qué campo del carrito guardo el resultado de la agregación? 
//     }
//   }
// ])

// console.log(inspect(result2, false, 10))

await mongoose.disconnect()
