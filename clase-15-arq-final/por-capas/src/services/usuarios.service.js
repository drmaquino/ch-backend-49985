import { getDaoUsuarios } from '../daos/usuarios/usuarios.dao.js'
import { getDaoJuguetes } from '../daos/juguetes/juguetes.dao.js'

const usuariosDao = getDaoUsuarios()
const juguetesDao = getDaoJuguetes()

class UsuariosService {
  async registrar(datos) {
    return await usuariosDao.create(datos)
  }

  async comprarJuguete(idUsuario, idJuguete) {
    const usuario = await usuariosDao.readOne({ _id: idUsuario })
    if (!usuario) throw new Error()

    const juguete = await juguetesDao.readOne({ _id: idJuguete })
    if (!usuario) throw new Error()

    // depende de lo que queramos que suceda en el negocio!
    // crear una venta? agregar una coleccion de ventas y guardarla?
    // agregarsela al usuario en una coleccion interna?
  }

  async darDeBaja(idUsuario) {
    const juguete = await usuariosDao.deleteOne({ _id: idUsuario })
    return juguete
  }
}

export const usuariosService = new UsuariosService()