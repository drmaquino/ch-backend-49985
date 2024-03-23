import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../src/config/config.js'

const dbClient = await mongoose.connect(MONGODB_CNX_STR)

const deleted = await dbClient.connection.collection('users').deleteMany(
  { username: 'admin' }
)

console.log(deleted)

const user = await dbClient.connection.collection('users').insertOne({
  username: 'admin',
  password: 'admin',
  fullName: 'admin',
  email: 'admin@admin.com'
})

console.log(user)

const updatedUser = await dbClient.connection.collection('users').findOneAndUpdate(
  { username: 'admin' },
  { $set: { rol: 'admin' } }
)

console.log(updatedUser)

await mongoose.disconnect()