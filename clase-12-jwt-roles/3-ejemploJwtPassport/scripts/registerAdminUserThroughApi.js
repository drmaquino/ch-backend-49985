const userData = {
  nombre: 'admin',
  apellido: 'admin',
  email: 'admin@admin.com',
  password: 'admin'
}

const result = await fetch('http://localhost:8080/api/usuarios', {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userData)
})

console.log(result.status)

export { }