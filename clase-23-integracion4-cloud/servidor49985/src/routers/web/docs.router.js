import { Router } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'

const SWAGGER_CONFIG = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Administrador de Usuarios',
      version: '1.0',
      description: 'Sistema para administrar los usuarios de coderhouse'
    }
  },
  apis: ['./docs/**/*.yaml']
}

const spec = swaggerJSDoc(SWAGGER_CONFIG)

export const docsRouter = Router()
docsRouter.use(serve, setup(spec))