export class GenericRepository {
  #dao
  constructor(dao) {
    this.#dao = dao
  }

  create(data, options) {
    return this.#dao.create(data)
  }

  readOne(criteria, options) {
    return this.#dao.readOne(criteria)
  }

  readMany(criteria, options) {
    return this.#dao.readMany(criteria)
  }

  updateOne(criteria, newData, options) {
    return this.#dao.updateOne(criteria, newData)
  }

  updateMany(criteria, newData, options) {
    return this.#dao.updateMany(criteria, newData)
  }

  deleteOne(criteria, options) {
    return this.#dao.deleteOne(criteria)
  }

  deleteMany(criteria, options) {
    return this.#dao.deleteMany(criteria)
  }
}

