import { randomUUID } from 'node:crypto'
import cookieParser from 'cookie-parser'

const sesiones = {}

function sesion(req, res, next) {
  let idSesion
  if (req.signedCookies.sid && sesiones[req.signedCookies.sid]) {
    idSesion = req.signedCookies.sid
  } else {
    idSesion = randomUUID()
    sesiones[idSesion] = {}
    res.cookie('sid', idSesion, {
      signed: true
    })
  }
  req['sesion'] = sesiones[idSesion]
  req['borrarSesion'] = () => {
    delete sesiones[idSesion]
    res.clearCookie(idSesion)
  }
  next()
}

export default function ({ secret }) {
  return (req, res, next) => {
    cookieParser(secret)(req, res, () => {
      sesion(req, res, next)
    })
  }
}