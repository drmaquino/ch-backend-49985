import mongoose from "mongoose"
import { randomUUID } from "node:crypto"
import { hasheadasSonIguales } from '../utils/criptografia.js'

const collection = 'usuarios'

const schema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  email: { type: String, unique: true, required: true },
  password: { type: String, default: '(no aplica)' },
  nombre: { type: String, required: true },
  apellido: { type: String, default: '(sin especificar)' },
}, {
  strict: 'throw',
  versionKey: false,
  statics: {
    login: async function (email, password) {
      let datosUsuario

      if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        datosUsuario = {
          email: 'admin',
          nombre: 'admin',
          apellido: 'admin',
          rol: 'admin'
        }
      } else {
        const usuario = await mongoose.model(collection).findOne({ email }).lean()

        if (!usuario) {
          throw new Error('login failed')
        }

        if (!hasheadasSonIguales(password, usuario['password'])) {
          throw new Error('login failed')
        }

        datosUsuario = {
          email: usuario['email'],
          nombre: usuario['nombre'],
          apellido: usuario['apellido'],
          rol: 'usuario'
        }
      }
      return datosUsuario
    }
  }
})

export const usuariosManager = mongoose.model(collection, schema)