import { desencriptar } from '../utils/criptografia.js'

export function extraerTokenDeLaQuery(nombreParametroUrl = 't') {
  return function (req, res, next) {
    const accessToken = req.query[nombreParametroUrl]
    if (!accessToken || accessToken === 'null') {
      return res.status(403).json({ status: 'error', message: 'no hay token' })
    }
    req['accessToken'] = accessToken
    next()
  }
}

export async function authenticate(req, res, next) {
  try {
    const userData = await desencriptar(req['accessToken'])
    req.user = userData
    next()
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'auth failed, invalid token' })
  }
}