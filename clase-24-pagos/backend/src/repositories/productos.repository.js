import { productosDaoMemoria } from '../daos/productos.dao.memoria.js'
import { GenericRepository } from './GenericRepository.js'

export class ProductosRepository extends GenericRepository { constructor(dao) { super(dao) } }

export const productosRepository = new ProductosRepository(productosDaoMemoria)