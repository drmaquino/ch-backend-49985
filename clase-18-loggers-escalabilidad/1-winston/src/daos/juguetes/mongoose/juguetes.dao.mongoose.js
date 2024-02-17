import { toPOJO } from '../../utils.js'

export class JuguetesDaoMongoose {
  constructor(juguetesModel) {
    this.juguetesModel = juguetesModel
  }

  async create(data) {
    const juguete = await this.juguetesModel.create(data)
    return toPOJO(juguete)
  }

  async readOne(query) {
    const juguetes = await this.juguetesModel.findOne(query).lean()
    return toPOJO(juguetes)
  }

  async readMany(query) {
    return toPOJO(await this.juguetesModel.find(query).lean())
  }

  async updateOne(query, data) {
    throw new Error('NOT IMPLEMENTED')
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
