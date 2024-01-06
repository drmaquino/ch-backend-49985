import jwt from "jsonwebtoken"

const PRIVATE_KEY = "myprivatekey"

export function encriptar(data) {
  return new Promise((resolve, reject) => {
    jwt.sign({ data }, PRIVATE_KEY, { expiresIn: '24h' }, (err, encoded) => {
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
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded.data)
      }
    })
  })
}
