import mongoose from 'mongoose'
import { randomUUID } from 'crypto'

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
        prods.splice(prodIndex, 1)
      }
      if (quantity > 0) {
        prods.push({
          product: prodId,
          quantity
        })
        this.products = prods
        await this.save()
      }
    }
  }
})

const Cart = mongoose.model('carts', cartSchema)

await Cart.deleteMany({})

const cart1 = await Cart.create({})
const cart2 = await Cart.create({})

await Cart.findByIdAndUpdate(cart1._id, { $push: { products: { product: prod1._id } } })
await Cart.findByIdAndUpdate(cart1._id, { $push: { products: { product: prod2._id } } })

await Cart.findByIdAndUpdate(cart2._id, { $push: { products: { product: prod2._id } } })
await Cart.findByIdAndUpdate(cart2._id, { $push: { products: { product: prod3._id } } })

await cart1.updateQuantity(prod1._id, 6)
await cart1.updateQuantity(prod2._id, 2)
await cart1.updateQuantity(prod2._id, 4)
await cart1.updateQuantity(prod3._id, 10)

//------------------------

// populate version mongoose:

const prodsPopulate = await Cart
  .find({}, { 'products._id': 0 })
  .populate('products.product')
  .lean()

// EXPLICACION
// const prodsPopulate = await Cart.find({
//   // aca va el filtro, si hay alguno
// }, {
//   // esta es la proyeccion. acá elimino el campo '_id'
//   // que agrega solito mongoose a cada producto en el carrito!
//   'products._id': 0
// })
//   // acá señalo cual es el campo que tiene que se reemplazado
//   // por la consulta a la otra coleccion (indicada como ref en el modelo)
//   .populate('products.product')
//   // acá indico que debe devolver POJOs
//   .lean()

console.log(JSON.stringify(prodsPopulate, null, 2))

await mongoose.disconnect()

