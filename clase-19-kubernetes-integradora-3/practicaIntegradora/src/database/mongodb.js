import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../config/config.js'

export async function connectDb() {
  await mongoose.connect(MONGODB_CNX_STR)
  console.log(`conectado a base de datos`)
}