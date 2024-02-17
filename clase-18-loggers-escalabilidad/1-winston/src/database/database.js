import { logger } from '../utils/logger.js'

import { connect as connectToMongoose } from 'mongoose'
import { MODO_EJECUCION, MONGODB_CNX_STR } from '../config/config.js'

export async function connect() {
  if (MODO_EJECUCION === 'online') {
    await connectToMongoose(MONGODB_CNX_STR)
    logger.info('conectado a mongodb')
  } else {
    logger.info('trabajando con persistencia local')
  }
}