import { toPOJO } from '../../utils.js'

export class UsuariosDaoMongoose {
  constructor(usuariosModel) {
    this.usuariosModel = usuariosModel
  }

  async create(data) {
    const juguete = await this.usuariosModel.create(data)
    return toPOJO(juguete)
  }

  async readOne(query) {
    return toPOJO(await this.usuariosModel.findOne(query).lean())
  }

  async readMany(query) {
    return toPOJO(await this.usuariosModel.find(query).lean())
  }

  async updateOne(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async updateMany(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteOne(query) {
    return toPOJO(await this.usuariosModel.findOneAndDelete(query).lean())
  }

  async deleteMany(query) {
    throw new Error('NOT IMPLEMENTED')
  }
}
