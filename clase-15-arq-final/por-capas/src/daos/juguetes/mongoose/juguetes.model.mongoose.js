import { Schema } from 'mongoose'
import { randomUUID } from 'node:crypto'

export const juguetesSchema = new Schema({
  _id: { type: String, default: randomUUID },
  nombre: { type: String, required: true },
  precio: { type: Number, min: 0, required: true },
}, {
  strict: 'throw',
  versionKey: false
})