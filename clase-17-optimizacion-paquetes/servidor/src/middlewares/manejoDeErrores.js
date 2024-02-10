import { ErrorType } from '../errors/errors.js'

export function manejoDeErrores(error, req, res, next) {
  switch (error.name) {
    case ErrorType.INVALID_DATA:
      res.status(400)
      break
    case ErrorType.NOT_FOUND:
      res.status(404)
      break
    default:
      res.status(500)
  }
  res.json({
    status: 'error',
    message: error.message
  })
}