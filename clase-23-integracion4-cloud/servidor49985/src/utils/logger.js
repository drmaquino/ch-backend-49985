import winston from 'winston'
import { NODE_ENV } from '../config/config.js'

const loggerLevel = {
  CONSOLE: NODE_ENV === 'production' ? 'error' : 'debug',
  FILE: NODE_ENV === 'production' ? 'http' : 'error'
}

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: loggerLevel.CONSOLE }),
    new winston.transports.File({ level: loggerLevel.FILE, filename: './logs/log.txt' })
  ]
})