export function soloLogueadosApi(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).json({ status: 'error', message: 'necesita iniciar sesion' })
  }
  next()
}
