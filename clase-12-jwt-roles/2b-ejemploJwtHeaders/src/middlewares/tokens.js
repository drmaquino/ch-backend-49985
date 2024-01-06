export function getBearerTokenFromHeader(headerName = 'authorization') {
  return function (req, res, next) {
    const authHeader = req.headers[headerName]

    if (!authHeader) {
      return res.sendStatus(401)
    }

    const accessToken = authHeader.split(' ')[1]

    if (!accessToken) {
      return res.sendStatus(401)
    }

    req.accessToken = accessToken
    next()
  }
}
