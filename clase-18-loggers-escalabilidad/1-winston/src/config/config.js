import { logger } from '../utils/logger.js'

export const MODO_EJECUCION = 'online'
// export const MODO_EJECUCION = 'offline'

export const PORT = 8080
export const MONGODB_CNX_STR = 'mongodb://localhost/jugueteria'

export const ADMIN_SMS_NUMBER = process.env.ADMIN_SMS_NUMBER

export const NODEMAILER_GMAIL_OPTIONS = {
  service: 'gmail',
  port: '587',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}

export const TWILIO_SMS_OPTIONS = {
  sid: process.env.TWILIO_SID,
  authToken: process.env.TWILIO_TOKEN,
  origin: process.env.TWILIO_SMS_NUMBER
}

export const NODE_ENV = process.env.NODE_ENV || 'development'

export const loggerLevel = {
  CONSOLE: NODE_ENV === 'production' ? 'error' : 'http',
  FILE: NODE_ENV === 'production' ? 'http' : 'error'
}
