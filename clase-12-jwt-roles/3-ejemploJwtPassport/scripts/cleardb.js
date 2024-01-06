import mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost/coderhouse')
console.log('connected!')
await mongoose.connection.dropDatabase()
console.log('dropped!')
await mongoose.disconnect()
console.log('disconnected!')