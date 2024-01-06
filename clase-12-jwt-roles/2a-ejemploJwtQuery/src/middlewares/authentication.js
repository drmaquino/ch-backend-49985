import { desencriptar } from '../utils/criptografia.js'

export async function authenticate(req, res, next) {

  if (!req.accessToken) {
    return res.status(401).json({
      error: 'no access token provided'
    })
  }

  try {
    const decoded = await desencriptar(req.accessToken)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({
      error: 'authentication failed'
    })
  }
}