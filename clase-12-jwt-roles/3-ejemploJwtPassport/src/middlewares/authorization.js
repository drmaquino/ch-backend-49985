export function solo(roles) {
  return function (req, res, next) {
    if (roles.includes(req.user.rol)) return next()
    res.sendStatus(403)
  }
}