import { logger } from '../../utils/logger.js'

import { model } from 'mongoose'
import { MODO_EJECUCION } from '../../config/config.js'

import { TiendasDaoMongoose } from './mongoose/tiendas.dao.mongoose.js'
import { tiendasSchema } from './mongoose/tiendas.model.mongoose.js'
import { TiendasDaoFiles } from './files/tiendas.dao.files.js'

const RUTA_TIENDAS_JSON = './db/usuarios.json'

let daoTiendas

if (MODO_EJECUCION === 'online') {
  // singleton!
  if (!daoTiendas) {
    const tiendasModel = model('tiendas', tiendasSchema)
    daoTiendas = new TiendasDaoMongoose(tiendasModel)
    logger.info('persistiendo tiendas en: mongodb')
  }
} else {
  daoTiendas = new TiendasDaoFiles(RUTA_TIENDAS_JSON)
  logger.info('persistiendo tiendas en: sistema de archivos')
}

export function getDaoTiendas() {
  return daoTiendas
} 
