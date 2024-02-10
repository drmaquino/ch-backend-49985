import { Schema, model } from 'mongoose'
import { randomUUID } from 'node:crypto'

const ProdInBusinessSchema = new Schema({
  _id: Number,
  price: Number,
  description: String,
})

const businessSchema = new Schema({
  _id: { type: String, default: randomUUID },
  name: String,
  products: [ProdInBusinessSchema],
}, { strict: 'throw', versionKey: false })

const businessModel = model('business', businessSchema)

//---------------------------------------------------

export class BusinessDao {

  async create(element) {
    const business = await businessModel.create(element)
    return business.toObject()
  }

  async readOne(criteria) {
    const result = await businessModel.findOne(criteria)
    if (!result) throw new Error('NOT FOUND')
    return result
  }

  async readMany(criteria) {
    return await businessModel.find(criteria).lean()
  }

  async updateOne(criteria, newData) {
    const modifiedUser = await businessModel
      .findOneAndUpdate(criteria, newData, { new: true })
      .lean()
    if (!modifiedUser) throw new Error('NOT FOUND')
    return modifiedUser
  }

  updateMany(criteria, newData) {
    return Promise.reject(new Error('NOT IMPLEMENTED: businessDao::updateMany'))
  }

  async deleteOne(criteria) {
    const deletedUser = await businessModel
      .findOneAndDelete(criteria)
      .lean()
    if (!deletedUser) throw new Error('NOT FOUND')
    return deletedUser
  }

  deleteMany(criteria) {
    return Promise.reject(new Error('NOT IMPLEMENTED: businessDao::deleteMany'))
  }
}
