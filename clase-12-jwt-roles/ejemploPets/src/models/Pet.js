import mongoose from 'mongoose'
import { randomUUID } from 'crypto'

const petSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  name: {
    type: String,
    unique: true,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  adopted: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false,
  strict: 'throw',
})

export const petManager = mongoose.model('pets', petSchema)