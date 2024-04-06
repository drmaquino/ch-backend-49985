import { DaoMemoria } from './DaoMemoria.js'

const productosDaoMemoria = new DaoMemoria('productos')

const mockData = [
  { id: 1, name: "papas", price: 1000 },
  { id: 2, name: "queso", price: 500 },
  { id: 3, name: "hamburguesa", price: 1500 },
  { id: 4, name: "soda", price: 1000 },
  { id: 5, name: "golosinas", price: 800 }
]

mockData.forEach(mockItem => {
  productosDaoMemoria.create(mockItem)
})

export { productosDaoMemoria }