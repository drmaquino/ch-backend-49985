import { Schema, model } from 'mongoose'
import { randomUUID } from 'node:crypto'

const publicacionSchema = new Schema({
  _id: { type: String, default: randomUUID },
  contenido: { type: String, required: true },
  fecha: { type: Date, default: () => new Date().toLocaleString() },
  fotoUrl: String
}, {
  strict: 'throw',
  versionKey: false
})

export const manager = model('publicaciones', publicacionSchema)
