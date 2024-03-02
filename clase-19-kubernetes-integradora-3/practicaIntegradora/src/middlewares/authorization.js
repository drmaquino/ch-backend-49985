export function soloRoles(roles) {
  return async function (req, res, next) {
    if (roles.includes(req.user.rol)) {
      return next()
    }
    const typedError = new Error('special permission needed')
    typedError['type'] = 'FAILED_AUTHORIZATION'
    next(typedError)
  }
}