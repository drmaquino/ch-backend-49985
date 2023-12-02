import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../config.js'

await mongoose.connect(MONGODB_CNX_STR)
console.log(`base de datos conectada!`)

export { manager as usuariosManager } from './Usuario.js'
export { manager as publicacionesManager } from './Publicacion.js'