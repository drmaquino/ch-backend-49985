import jwt from "jsonwebtoken"
import { JWT_SECRET } from '../config.js'

export function encriptar(data) {
  return new Promise((resolve, reject) => {
    jwt.sign({ data }, JWT_SECRET, { expiresIn: '24h' }, (err, encoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(encoded)
      }
    })
  })
}

export function desencriptar(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded.data)
      }
    })
  })
}
