import { MODO_EJECUCION } from '../../config/config.js'

let getDaoJuguetes

if (MODO_EJECUCION === 'online') {
  const { getDaoMongoose } = await import('./juguetes.dao.mongoose.js')
  getDaoJuguetes = getDaoMongoose
} else {
  const { getDaoFiles } = await import('./juguetes.dao.files.js')
  getDaoJuguetes = getDaoFiles
}

export {
  getDaoJuguetes
}