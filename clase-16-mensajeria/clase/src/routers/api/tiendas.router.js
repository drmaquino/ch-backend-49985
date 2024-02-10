import { Router } from 'express'
import { postController, postJuguetesController } from '../../controllers/tiendas.controller.js'

export const tiendasRouter = Router()

tiendasRouter.post('/', postController)
tiendasRouter.post('/:id/juguetes', postJuguetesController)

// tiendasRouter.delete('/:idTienda/juguetes/:idJuguete', deleteJugueteController)

// carritosRouter.update('/:idCart/productos/:idProd', updateProdCantController)