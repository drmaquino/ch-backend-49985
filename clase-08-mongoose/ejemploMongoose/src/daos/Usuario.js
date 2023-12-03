import { Schema, model } from 'mongoose'
import { randomUUID } from 'node:crypto'

const usuarioSchema = new Schema({
  _id: { type: String, default: randomUUID },
  alias: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  amigos: { type: [String], default: [] },
  publicaciones: { type: [String], default: [] },
  fotoUrl: { type: String, default: '/static/images/default.png' }
}, {
  strict: 'throw',
  versionKey: false,
  methods: {
    agregarPublicacion: async function (idPublicacion) {
      if (!this.publicaciones.includes(idPublicacion)) {
        this.publicaciones.push(idPublicacion)
        await this.save()
        return true
      }
      return false
    },
    eliminarPublicacion: async function (idPublicacion) {
      const index = this.publicaciones.indexOf(idPublicacion)
      if (index !== -1) {
        this.publicaciones.slice(index, 1)
        await this.save()
        return true
      }
      return false
    }
  }
})

export const usuariosManager = model('usuarios', usuarioSchema)
