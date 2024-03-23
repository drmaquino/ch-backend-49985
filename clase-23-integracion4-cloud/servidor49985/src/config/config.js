import { config } from 'dotenv'

export const NODE_ENV = process.env.NODE_ENV || 'development'
if (NODE_ENV === 'development') { config() }

export const PORT = Number(process.env.PORT) || 8080
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR || 'mongodb://localhost:27017/coderhouse'

export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || '123'
export const COOKIE_SECRET = process.env.COOKIE_SECRET || '123'

export const DEFAULT_USER_AVATAR_PATH = './static/imgs/default-user.webp'

export const DEFAULT_ROLE = 'user'

export const EMAIL_USER = process.env.EMAIL_USER || 'test email user'
export const EMAIL_PASS = process.env.EMAIL_PASS

const etherealEmailConfig = {
  sender: 'Anya Rutherford',
  config: {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'anya.rutherford47@ethereal.email',
      pass: 'Hr2fnGvNm7vqV3x5kt'
    }
  }
}

const gmailEmailConfig = {
  sender: EMAIL_USER,
  config: {
    service: 'gmail',
    port: 587,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  }
}

export const NODEMAILER_CONFIG = etherealEmailConfig
