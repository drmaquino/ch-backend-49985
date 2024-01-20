import { Schema, model, connect } from 'mongoose'
import { randomUUID } from 'node:crypto'
import { MONGODB_CNX_STR } from '../../config/config.js'

const usuariosSchema = new Schema({
  _id: { type: String, default: randomUUID },
  nombre: { type: String, required: true },
}, {
  strict: 'throw',
  versionKey: false
})

const usuariosModel = model('usuarios', usuariosSchema)

class UsuariosDaoMongoose {
  async create(data) {
    const juguete = await usuariosModel.create(data)
    return juguete.toObject()
  }

  async readOne(query) {
    return await usuariosModel.findOne(query).lean()
  }

  async readMany(query) {
    return await usuariosModel.find(query).lean()
  }

  async updateOne(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async updateMany(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteOne(query) {
    return await usuariosModel.findOneAndDelete(query).lean()
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
    juguetesDaoMongoose = new UsuariosDaoMongoose()
  }
  return juguetesDaoMongoose
}