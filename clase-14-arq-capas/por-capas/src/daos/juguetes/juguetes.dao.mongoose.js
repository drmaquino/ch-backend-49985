import { Schema, model, connect } from 'mongoose'
import { randomUUID } from 'node:crypto'
import { MONGODB_CNX_STR } from '../../config/config.js'

const juguetesSchema = new Schema({
  _id: { type: String, default: randomUUID },
  nombre: { type: String, required: true },
  precio: { type: Number, min: 0, required: true },
}, {
  strict: 'throw',
  versionKey: false
})

const juguetesModel = model('juguetes', juguetesSchema)

class JuguetesDaoMongoose {
  async create(data) {
    const juguete = await juguetesModel.create(data)
    return juguete.toObject()
  }

  async readOne(query) {
    return await juguetesModel.findOne(query).lean()
  }

  async readMany(query) {
    return await juguetesModel.find(query).lean()
  }

  async updateOne(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async updateMany(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteOne(query) {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteMany(query) {
    throw new Error('NOT IMPLEMENTED')
  }
}

let juguetesDaoMongoose
console.log('usando persistencia en mongodb')

export async function getDaoMongoose() {
  if (!juguetesDaoMongoose) {
    await connect(MONGODB_CNX_STR)
    console.log('conectado a mongodb')
    juguetesDaoMongoose = new JuguetesDaoMongoose()
  }
  return juguetesDaoMongoose
}