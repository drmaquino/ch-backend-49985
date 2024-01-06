import { connect } from 'mongoose'
import { MONGODB_CNX_STR } from '../config/config.js'

export async function connectDb() {
  await connect(MONGODB_CNX_STR)
  console.log('base de datos conectada')
}