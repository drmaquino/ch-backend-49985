import { encriptar } from '../utils/criptografia.js'

const cookieOpts = {
  httpOnly: true, maxAge: 1000 * 60 * 60 * 24 /* 1 dia */, signed: true
}

export async function tokenizeUserInCookie(req, res, next) {
  try {
    const token = await encriptar(req.user)
    res.cookie('authorization', token, cookieOpts)
    next()
  } catch (error) {
    next(error)
  }
}

export function deleteTokenFromCookie(req, res, next) {
  res.clearCookie('authorization', cookieOpts)
  next()
}