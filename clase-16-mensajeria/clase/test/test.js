// registrar usuario                OK
// registrar tienda                 OK
// agregar juguete a una tienda     OK
// crear ordenes de compra          -


// daos
class UsuariosDao { }
class TiendasDao { }
class JuguetesDao { }


// modelos
class Usuario {
  constructor(datos) { }
  toPOJO() { }
}

class Tienda {
  constructor(datos) { }
  toPOJO() { }
}

class Juguete {
  constructor(datos) { }
  toPOJO() { }
}

// servicios
class UsuariosService {
  constructor(usuariosDao) {
    this.usuariosDao = usuariosDao
  }

  async registrar(datosUsuario) {
    const usuario = new Usuario(datosUsuario)
    const userPojo = usuario.toPOJO()
    await this.usuariosDao.create(userPojo)
    return userPojo
  }
}

class TiendasService {
  constructor(tiendasDao, juguetesService) {
    this.tiendasDao = tiendasDao
    this.juguetesService = juguetesService
  }

  async registrar(datosTienda) {
    const tienda = new Tienda(datosTienda)
    const tiendaPojo = tienda.toPOJO()
    await this.tiendasDao.create(tiendaPojo)
    return tiendaPojo
  }

  async agregarJuguete(idTienda, idJuguete) {

    const tienda = await this.tiendasDao.readOne({ _id: idTienda })
    if (!tienda) {
      throw new Error('la tienda no existe')
    }

    const juguete = await this.juguetesService.readOne({ _id: idJuguete })
    if (!juguete) {
      throw new Error('el juguete no existe')
    }

    tienda.juguetes.push(idJuguete)

    await this.tiendasDao.updateOne({ _id: idTienda }, tienda)
  }
}

class JuguetesService {
  constructor(juguetesDao) {
    this.juguetesDao = juguetesDao
  }

  async agregar(datosJuguete) {
    const juguete = new Juguete(datosJuguete)
    const juguetePojo = juguete.toPOJO()
    await this.juguetesDao.create(juguetePojo)
    return juguetePojo
  }
}

// logica del negocio

// const tienda = new Tienda()
// const orden = new Orden()

const usuariosDao = new UsuariosDao()
const usuariosService = new UsuariosService(usuariosDao)
const usuario = usuariosService.registrar({ /* datos del usuario */ })

const juguetesDao = new JuguetesDao()
const juguetesService = new JuguetesService()
const juguete = juguetesService.agregar({ /* datos de un juguete */ })

const tiendasDao = new TiendasDao()
const tiendasService = new TiendasService(tiendasDao, juguetesService)
const tienda = tiendasService.registrar({ /* datos de una tienda */ })
tiendasService.agregarJuguete(tienda._id, juguete._id)