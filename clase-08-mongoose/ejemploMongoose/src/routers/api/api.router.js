import { Router, json, urlencoded } from 'express'
import { usuariosRouter } from './usuarios.router.js'

export const apiRouter = Router()
apiRouter.use(json(), urlencoded({ extended: true }))

apiRouter.use('/usuarios', usuariosRouter)