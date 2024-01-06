import mongoose from 'mongoose'
import { randomUUID } from 'crypto'

const userSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  username: { type: String, required: true },
  password: { type: String, required: true }
}, {
  versionKey: false,
  strict: 'throw'
})

export const usersManager = mongoose.model('users', userSchema) 