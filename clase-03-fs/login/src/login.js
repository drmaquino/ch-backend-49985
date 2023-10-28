import { UserManager } from './UserManager.js'

const um = new UserManager('./db/usuarios.json')
await um.reset()

const usuario = await um.agregar({
  nombre: 'marian',
  apellido: 'profe',
  username: 'maquino',
  password: '123'
})

console.log(usuario)

const buscado = await um.login('maquino', '123')

console.log('logueado correctamente: ')
console.log(buscado)

console.log('nombre inexistente: ')
try {
  await um.login('pepe', '123')
} catch (error) {
  console.log(error)
}

console.log('contrasenia invalida: ')
try {
  await um.login('maquino', 'coco')
} catch (error) {
  console.log(error)
}