import { getDaoJuguetes } from '../daos/juguetes/juguetes.dao.js'
import { Juguete } from '../models/juguetes.model.js'

const juguetesDao = getDaoJuguetes()

class JuguetesService {

  async agregarJuguete(datosJuguete) {
    const juguete = new Juguete(datosJuguete)
    const jugueteGuardado = await juguetesDao.create(juguete.toPOJO())
    return jugueteGuardado
  }
  async readOne(criterio) {
    return await juguetesDao.readOne(criterio)
  }

  async readMany(criterio) {
    return await juguetesDao.readOne(criterio)
  }
}

export const juguetesService = new JuguetesService()