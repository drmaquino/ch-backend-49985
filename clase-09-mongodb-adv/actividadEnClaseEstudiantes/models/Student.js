import mongoose from "mongoose"
import { randomUUID } from "node:crypto"

const collection = 'Students'

const schema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  grade: Number,
  group: String
}, {
  strict: 'throw',
  versionKey: false
})

export const Student = mongoose.model(collection, schema)
