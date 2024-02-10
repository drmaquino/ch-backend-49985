import { Usuario } from '../models/usuario.model.js'
import { ADMIN_SMS_NUMBER } from '../config/config.js'

export class UsuariosService {

  constructor({ smsService, usuariosDao, juguetesDao }) {
    this.smsService = smsService
    this.usuariosDao = usuariosDao
    this.juguetesDao = juguetesDao
  }

  async registrar(datos) {
    const usuario = new Usuario(datos)
    await this.usuariosDao.create(usuario.toPOJO())
    await this.smsService.enviar({
      to: ADMIN_SMS_NUMBER,
      message: `nuevo usuario: ${usuario.nombre} (${usuario.email})`
    })
    return usuario.toPOJO()
  }

  async comprarJuguete(idUsuario, idJuguete) {
    const usuario = await this.usuariosDao.readOne({ _id: idUsuario })
    if (!usuario) throw new Error()

    const juguete = await this.juguetesDao.readOne({ _id: idJuguete })
    if (!usuario) throw new Error()

    // depende de lo que queramos que suceda en el negocio!
    // crear una venta? agregar una coleccion de ventas y guardarla?
    // agregarsela al usuario en una coleccion interna?
  }

  async darDeBaja(idUsuario) {
    const juguete = await this.usuariosDao.deleteOne({ _id: idUsuario })
    return juguete
  }
}
