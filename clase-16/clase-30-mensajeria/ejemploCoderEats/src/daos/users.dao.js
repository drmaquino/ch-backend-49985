import { Schema, model } from 'mongoose'
import { randomUUID } from 'node:crypto'

const usersSchema = new Schema({
  _id: { type: String, default: randomUUID },
  name: String,
  email: String,
  role: String,
  orders: {
    type: [
      {
        type: String,
        ref: 'orders'
      }
    ],
    default: []
  }
}, { strict: 'throw', versionKey: false })

const usersModel = model('users', usersSchema)

//---------------------------------------------------

export class UsersDao {

  async create(element) {
    const user = await usersModel.create(element)
    return user.toObject()
  }

  async readOne(criteria) {
    const result = await usersModel
      .findOne(criteria)
      .populate('orders')
      .lean()

    if (!result) throw new Error('NOT FOUND')
    return result
  }

  async readMany(criteria) {
    return await usersModel
      .find(criteria)
      .populate('orders')
      .lean()
  }

  async updateOne(criteria, newData) {
    const modifiedUser = await usersModel
      .findOneAndUpdate(criteria, newData, { new: true })
      .populate('orders')
      .lean()

    if (!modifiedUser) throw new Error('NOT FOUND')
    return modifiedUser
  }

  updateMany(criteria, newData) {
    return Promise.reject(new Error('NOT IMPLEMENTED: usersDao::updateMany'))
  }

  async deleteOne(criteria) {
    const deletedUser = await usersModel
      .findOneAndDelete(criteria)
      .populate('orders')
      .lean()

    if (!deletedUser) throw new Error('NOT FOUND')
    return deletedUser
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: usersDao::deleteMany'))
  }
}
