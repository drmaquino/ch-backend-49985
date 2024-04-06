function matcher(query) {
  return function (obj) {
    const conditions = Object.entries(query)
    for (const [key, value] of conditions) {
      if (!obj[key] || obj[key] != value) return false
    }
    return true
  }
}

function toPojo(object) {
  return JSON.parse(
    JSON.stringify(
      object
    )
  )
}

export class DaoMemoria {
  #entityName
  #elements
  constructor(entityName) {
    this.#entityName = entityName
    this.#elements = []
  }

  get entityName() { return this.#entityName }

  create(element) {
    const pojo = toPojo(element)
    this.#elements.push(pojo)
    return Promise.resolve(pojo)
  }

  readOne(criteria) {
    const result = this.#elements.find(matcher(criteria))
    if (!result) throw new Error('NOT FOUND')
    return Promise.resolve(result)
  }

  readMany(criteria) {
    return Promise.resolve(this.#elements.filter(matcher(criteria)))
  }

  updateOne(criteria, newData) {
    const index = this.#elements.findIndex(matcher(criteria))
    if (index === -1) throw new Error('NOT FOUND')
    this.#elements[index] = toPojo({
      ...this.#elements[index],
      ...newData
    })
    return Promise.resolve(this.#elements[index])
  }

  updateMany(criteria, newData) {
    let modifiedCount = 0
    for (let index = 0; index < this.#elements.length; index++) {
      if (matcher(criteria)(this.#elements[index])) {
        this.#elements[index] = toPojo({
          ...this.#elements[index],
          ...newData
        })
        modifiedCount++
      }
    }
    return Promise.resolve({ modifiedCount })
  }

  deleteOne(criteria) {
    const index = this.#elements.findIndex(matcher(criteria))
    if (index === -1) throw new Error('NOT FOUND')
    const deleted = this.#elements[index]
    this.#elements.splice(index, 1)
    return Promise.resolve(deleted)
  }

  deleteMany(criteria) {
    let initialCount = this.#elements.length
    this.#elements = this.#elements.filter(e => !matcher(criteria)(e))
    return Promise.resolve({ deletedCount: initialCount - this.#elements.length })
  }
}