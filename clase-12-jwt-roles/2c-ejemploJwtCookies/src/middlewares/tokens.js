export function getTokenFromSignedCookies(cookieName = 'authorization') {
  return function (req, res, next) {
    req.accessToken = req.signedCookies[cookieName]
    next()
  }
}