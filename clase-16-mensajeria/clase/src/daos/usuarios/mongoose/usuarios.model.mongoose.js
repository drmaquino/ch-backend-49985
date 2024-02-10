import { Schema } from 'mongoose'
import { randomUUID } from 'node:crypto'

export const usuariosSchema = new Schema({
  _id: { type: String, default: randomUUID },
  nombre: { type: String, required: true },
  email: { type: String, required: true },
}, {
  strict: 'throw',
  versionKey: false
})
