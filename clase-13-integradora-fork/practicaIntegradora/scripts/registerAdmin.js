import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../src/config/config.js'
import { User } from '../src/models/User.js'

await mongoose.connect(MONGODB_CNX_STR)

const deleted = await User.deleteMany(
  { username: 'admin' }
)

console.log(deleted)

const user = await User.registrar({
  username: 'admin',
  password: 'admin',
  nombreCompleto: 'admin',
  email: 'admin@admin.com'
})

console.log(user)

const updatedUser = await User.findOneAndUpdate(
  { username: 'admin' },
  { $set: { rol: 'admin' } },
  { new: true }
)

console.log(updatedUser)

await mongoose.disconnect()