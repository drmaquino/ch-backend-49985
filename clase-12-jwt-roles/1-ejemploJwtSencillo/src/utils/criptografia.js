import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

export function encriptar(data) {
  return new Promise((resolve, reject) => {
    if (!data) reject(new Error('invalid data for encription'))
    jwt.sign(data, JWT_SECRET, { expiresIn: '24h' }, (err, dataEncriptada) => {
      if (err) {
        reject(err)
      } else {
        resolve(dataEncriptada)
      }
    })
  })
}

export function desencriptar(token) {
  return new Promise((resolve, reject) => {
    if (!token) reject(new Error('invalid data for decription'))
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
