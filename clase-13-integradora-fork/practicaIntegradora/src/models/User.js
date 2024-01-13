import { Schema, model } from 'mongoose'

import mongoose from 'mongoose'
import { randomUUID } from 'crypto'
import { DEFAULT_USER_AVATAR_PATH } from '../config/config.js'
import { hasheadasSonIguales, hashear } from '../utils/criptografia.js'

const collName = 'users'

const schema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  foto: { type: String, default: DEFAULT_USER_AVATAR_PATH },
  rol: { type: String, enum: ['admin', 'user'], default: 'user' }
}, {
  versionKey: false,
  strict: 'throw',
  statics: {
    registrar: async function (userData) {
      try {
        if (userData.password) {
          userData.password = await hashear(userData.password)
        }
        delete userData.rol
        const user = await this.create(userData)
        return user.toObject()
      } catch (error) {
        const typedError = new Error(error.message)
        typedError['type'] = 'INVALID_ARGUMENT'
        throw typedError
      }
    },
    autenticar: async function ({ username, password }) {
      const user = await this.findOne({ username })
      if (!user) {
        const typedError = new Error('error de autenticacion')
        typedError['type'] = 'FAILED_AUTHENTICATION'
        throw typedError
      }
      if (!hasheadasSonIguales(password, user.password)) {
        const typedError = new Error('error de autenticacion')
        typedError['type'] = 'FAILED_AUTHENTICATION'
        throw typedError
      }
      return user.toObject()
    }
  }
})

export const User = mongoose.model(collName, schema)
