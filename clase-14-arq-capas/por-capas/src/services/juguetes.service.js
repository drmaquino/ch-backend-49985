import { getDaoJuguetes } from '../daos/juguetes/juguetes.dao.js'

const juguetesDao = await getDaoJuguetes()

class JuguetesService {
  async obtenerJuguetes() {
    return await juguetesDao.readMany({})
  }

  async agregarJuguete(datosJuguete) {
    const juguete = await juguetesDao.create(datosJuguete)
    return juguete
  }
}

export const juguetesService = new JuguetesService()