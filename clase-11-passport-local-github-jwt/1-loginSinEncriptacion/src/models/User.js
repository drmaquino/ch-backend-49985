import mongoose from "mongoose"
import { randomUUID } from "node:crypto"

const collection = 'usuarios'

const schema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
}, {
  strict: 'throw',
  versionKey: false
})

export const usuariosManager = mongoose.model(collection, schema)