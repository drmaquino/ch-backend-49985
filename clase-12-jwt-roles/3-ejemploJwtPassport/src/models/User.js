import mongoose from "mongoose"
import { randomUUID } from "node:crypto"
import { hasheadasSonIguales, hashear } from '../utils/criptografia.js'

const collection = 'users'

const schema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {
  strict: 'throw',
  versionKey: false,
  methods: {
    infoPublica: function () {
      return {
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        rol: this.rol,
      }
    }
  },
  statics: {
    registrar: async function (reqBody) {

      //-------------------------------------------------------------------------------
      // mecanismo hardcodeado para asignar permisos de admin a un usuario determinado!
      ASIGNAR_ROL(reqBody)
      //-------------------------------------------------------------------------------

      reqBody.password = hashear(reqBody.password)

      const creado = await mongoose.model(collection).create(reqBody)
      return creado.infoPublica()
    },
    autenticar: async function (email, password) {
      const usuario = await mongoose.model(collection).findOne({ email })
      if (!usuario) {
        throw new Error('usuario no encontrado')
      }
      if (!hasheadasSonIguales(password, usuario['password'])) {
        throw new Error('las contraseñas no coinciden')
      }
      return usuario.infoPublica()
    },
    actualizar: async function (datos) {
      const actualizado = await mongoose.model(collection).findOneAndUpdate(
        { email: datos.email },
        { $set: datos },
        { new: true }
      )
      if (!actualizado) {
        throw new Error('usuario no encontrado')
      }
      return actualizado.infoPublica()
    },
    resetearContrasenia: async function ({ email, password: newPassword }) {
      const hashedPassword = hashear(newPassword)

      const actualizado = await mongoose.model(collection).findOneAndUpdate(
        { email },
        { $set: { password: hashedPassword } },
        { new: true }
      )
      if (!actualizado) {
        throw new Error('usuario no encontrado')
      }
      return actualizado.infoPublica()
    }
  }
})

function ASIGNAR_ROL(obj) {
  if (obj.email === 'admin@admin.com') {
    obj.rol = 'admin'
  } else {
    obj.rol = 'user'
  }
}

export const usuariosManager = mongoose.model(collection, schema)