import { randomUUID } from 'crypto'

const usuarios = []

export const usuariosManager = {
  findByUsername: (username) => {
    const usuario = usuarios.find(usuario => usuario.username == username)
    return Promise.resolve(usuario)
  },
  insertOne: (datosUsuario) => {
    const usuario = {
      _id: randomUUID(),
      username: datosUsuario.username,
      password: datosUsuario.password,
      address: datosUsuario.address
    }
    usuarios.push(usuario)
    return Promise.resolve(usuario)
  },
  authenticate: (username, password) => {
    const usuario = usuarios.find(usuario => usuario.username === username && usuario.password === password)
    return Promise.resolve(usuario)
  }
}