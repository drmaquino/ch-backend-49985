import { Schema, model } from 'mongoose'
import { randomUUID } from 'node:crypto'

const publicacionSchema = new Schema({
  _id: { type: String, default: randomUUID },
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, default: () => new Date().toLocaleString() },
  idAutor: { type: String },
  fotoUrl: String
}, {
  strict: 'throw',
  versionKey: false
})

export const publicacionesManager = model('publicaciones', publicacionSchema)
