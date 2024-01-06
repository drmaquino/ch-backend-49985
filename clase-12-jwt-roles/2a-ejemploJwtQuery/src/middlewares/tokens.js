export function getTokenFromQuery(paramName = 'authorization') {
  return function (req, res, next) {
    req.accessToken = req.query[paramName]
    next()
  }
}
