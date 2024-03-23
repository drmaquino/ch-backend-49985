import mongoose from 'mongoose'

export async function connectDb(cnxStr) {
  await mongoose.connect(cnxStr)
}

export async function disconnectDb() {
  await mongoose.disconnect()
}

export async function clearDb() {
  await mongoose.connection.dropDatabase()
}