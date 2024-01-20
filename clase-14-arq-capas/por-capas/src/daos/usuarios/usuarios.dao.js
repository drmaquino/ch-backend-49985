import { MODO_EJECUCION } from '../../config/config.js'

let getDaoUsuarios

if (MODO_EJECUCION === 'online') {
  const { getDaoMongoose } = await import('./usuarios.dao.mongoose.js')
  getDaoUsuarios = getDaoMongoose
} else {
  const { getDaoFiles } = await import('./usuarios.dao.files.js')
  getDaoUsuarios = getDaoFiles
}

export {
  getDaoUsuarios
}