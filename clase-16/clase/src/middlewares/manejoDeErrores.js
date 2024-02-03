export function manejoDeErrores(error, req, res, next) {
  // res.status()
  res.status(400)
  res.json({ status: 'error', message: error.message })
}