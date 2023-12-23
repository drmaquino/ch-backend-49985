import { Router } from 'express'
import { sesionesRouter } from './sesiones.router.js'
import { usuariosRouter } from './usuarios.router.js'

export const webRouter = Router()

webRouter.use(sesionesRouter)
webRouter.use(usuariosRouter)

webRouter.get('/', (req, res) => { res.redirect('/profile') })
