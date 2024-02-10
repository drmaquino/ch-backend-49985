// capa de negocio!!

export function newError(tipo, message) {
  const error = new Error(message)
  error.name = tipo
  return error
}

//------------------------------

export function newNotFoundError(message) {
  const error = new Error(message)
  error.name = ErrorType.NOT_FOUND
  return error
}

export function newInvalidDataError(message) {
  const error = new Error(message)
  error.name = ErrorType.INVALID_DATA
  return error
}

//------------------------------

export class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = ErrorType.NOT_FOUND
  }
}

export class InvalidDataError extends Error {
  constructor(message) {
    super(message)
    this.name = ErrorType.INVALID_DATA
  }
}

// esto es una enumeracion
export const ErrorType = {
  NOT_FOUND: 'NOT_FOUND',
  INVALID_DATA: 'INVALID_DATA',
}
