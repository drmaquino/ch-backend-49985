class SuscriptoresDao {
  constructor() {
    this.suscriptores = []
  }

  create(suscriptor) {
    this.suscriptores.push(suscriptor)
  }

  readMany() { return this.suscriptores }

  deleteOne({ email }) {
    const index = this.suscriptores.findIndex(s => s.email === email)
    if (index === -1) throw new Error('suscriptor no encontrado')
    this.suscriptores.splice(index, 1)
  }
}

const suscriptoresDao = new SuscriptoresDao()

export function getDaoSuscriptores() {
  return suscriptoresDao
} 
