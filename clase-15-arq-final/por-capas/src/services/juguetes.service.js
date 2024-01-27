import { getDaoJuguetes } from '../daos/juguetes/juguetes.dao.js'

const juguetesDao = getDaoJuguetes()

class JuguetesService {
  async readOne(criterio) {
    return await juguetesDao.readOne(criterio)
  }

  async readMany(criterio) {
    return await juguetesDao.readOne(criterio)
  }

  async agregarJuguete(datosJuguete) {
    const juguete = await juguetesDao.create(datosJuguete)
    return juguete
  }
}

export const juguetesService = new JuguetesService()