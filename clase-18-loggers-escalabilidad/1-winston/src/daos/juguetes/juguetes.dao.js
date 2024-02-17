import { logger } from '../../utils/logger.js'

import { connect, model } from 'mongoose'
import { MODO_EJECUCION } from '../../config/config.js'
import { MONGODB_CNX_STR } from '../../config/config.js'

import { JuguetesDaoMongoose } from './mongoose/juguetes.dao.mongoose.js'
import { JuguetesDaoFiles } from './files/juguetes.dao.files.js'
import { juguetesSchema } from './mongoose/juguetes.model.mongoose.js'


const RUTA_USUARIOS_JSON = './db/juguetes.json'

let daoJuguetes

if (MODO_EJECUCION === 'online') {
  // singleton!
  if (!daoJuguetes) {
    const juguetesModel = model('juguetes', juguetesSchema)
    daoJuguetes = new JuguetesDaoMongoose(juguetesModel)
    logger.info('persistiendo juguetes en: mongodb')
  }
} else {
  daoJuguetes = new JuguetesDaoFiles(RUTA_USUARIOS_JSON)
  logger.info('persistiendo juguetes en: sistema de archivos')
}

export function getDaoJuguetes() {
  return daoJuguetes
} 
