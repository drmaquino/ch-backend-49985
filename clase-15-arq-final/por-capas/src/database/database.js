import { connect as connectToMongoose } from 'mongoose'
import { MODO_EJECUCION, MONGODB_CNX_STR } from '../config/config.js'

export async function connect() {
  if (MODO_EJECUCION === 'online') {
    await connectToMongoose(MONGODB_CNX_STR)
    console.log('conectado a mongodb')
  } else {
    console.log('trabajando con persistencia local')
  }
}