import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../config/config.js'

export async function connectDb() {
  await mongoose.connect(MONGODB_CNX_STR)
}

export async function disconnectDb() {
  await mongoose.disconnect()
  // console.log(`desconectado de la base de datos`)
}