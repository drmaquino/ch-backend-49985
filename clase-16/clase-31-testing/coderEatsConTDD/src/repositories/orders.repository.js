import { ordersDao } from '../daos/index.js'
import { Order } from '../models/Order.js'

export class OrdersRepository {

  async save(order) {
    const orderDto = await ordersDao.create(order.toObject())
    return new Order(orderDto)
  }

  async readOne(criteria) {
    const orderDto = await ordersDao.readOne(criteria)
    if (!orderDto) throw new Error('no existe la orden')
    return new Order(orderDto)
  }

  async readMany(criteria) {
    const ordersDtos = await ordersDao.readMany(criteria)
    return ordersDtos.map(dto => new Order(dto))
  }

  async updateOne(criteria, newOrder) {
    const updatedDto = await ordersDao.updateOne(criteria, newOrder.toObject())
    if (!updatedDto) throw new Error('no existe la orden')
    return new Order(updatedDto)
  }

  updateMany(criteria, newOrder) {
    return Promise.reject(new Error('NOT IMPLEMENTED: ordersDao::updateMany'))
  }

  async deleteOne(criteria) {
    const deletedDto = await ordersDao.deleteOne(criteria)
    if (!deletedDto) throw new Error('no existe la orden')
    return new Order(deletedDto)
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: ordersDao::deleteMany'))
  }
}

export const ordersRepository = new OrdersRepository()
