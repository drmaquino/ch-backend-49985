import { toPOJO } from '../../utils.js'

export class TiendasDaoMongoose {
  constructor(tiendasModel) {
    this.tiendasModel = tiendasModel
  }

  async create(data) {
    const tienda = await this.tiendasModel.create(data)
    return toPOJO(tienda)
  }

  async readOne(query) {
    return toPOJO(await this.tiendasModel.findOne(query).lean())
  }

  async readMany(query) {
    throw new Error('NOT IMPLEMENTED')
  }

  async updateOne(query, data) {
    return toPOJO(await this.tiendasModel.findOneAndUpdate(query, data).lean())
  }

  async updateMany(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteOne(query) {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteMany(query) {
    throw new Error('NOT IMPLEMENTED')
  }
}
