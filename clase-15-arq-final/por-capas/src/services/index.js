import { getDaoTiendas } from '../daos/tiendas/tiendas.dao.js'
import { juguetesService } from './juguetes.service.js'
import { TiendasService } from './tiendas.service.js'

const tiendasDao = getDaoTiendas()

export const tiendasService = new TiendasService(tiendasDao, juguetesService)
