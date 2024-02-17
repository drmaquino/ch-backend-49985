import winston from 'winston'
import { loggerLevel } from '../config/config.js'

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: loggerLevel.CONSOLE }),
    new winston.transports.File({ level: loggerLevel.FILE, filename: './logs/log.txt' })
  ]
})