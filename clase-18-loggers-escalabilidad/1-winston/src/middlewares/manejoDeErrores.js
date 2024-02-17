import { ErrorType } from '../errors/errors.js'
import { logger } from '../utils/logger.js'

export function manejoDeErrores(error, req, res, next) {
  let status
  switch (error.name) {
    case ErrorType.INVALID_DATA:
      status = 400
      break
    case ErrorType.NOT_FOUND:
      status = 404
      break
    default:
      status = 500
  }

  logger.error(`http error - status: ${status} - message: ${error.message}`)

  res.status(status).json({
    status: 'error',
    message: error.message
  })
}