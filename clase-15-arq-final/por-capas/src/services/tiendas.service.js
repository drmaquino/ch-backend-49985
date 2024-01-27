export class TiendasService {
  constructor(tiendasDao, juguetesService) {
    this.tiendasDao = tiendasDao
    this.juguetesService = juguetesService
  }

  async registrar(datosTienda) {
    const tiendaPojo = await this.tiendasDao.create(datosTienda)
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
