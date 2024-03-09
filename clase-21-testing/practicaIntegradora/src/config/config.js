import 'dotenv/config'

export const PORT = 8080
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR || 'mongodb://localhost:27017/coderhouse'

export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || ''
export const COOKIE_SECRET = process.env.COOKIE_SECRET || ''

export const DEFAULT_USER_AVATAR_PATH = './static/imgs/default-user.webp'

export const DEFAULT_ROLE = 'user'

export const MODE = process.env.MODE || 'development'

export const EMAIL_USER = process.env.EMAIL_USER || 'test email user'
export const EMAIL_PASS = process.env.EMAIL_PASS

export const SWAGGER_CONFIG = {
  definition: {
    openapi: '3.0.1',
    info: {
      version: '1',
      title: 'Swagger Demo',
      description: 'Demo de swagger para coderhouse'
    }
  },
  apis: ['./docs/**/*.yaml']
}