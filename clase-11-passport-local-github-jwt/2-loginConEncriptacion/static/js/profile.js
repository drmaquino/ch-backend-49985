const formLogout = document.querySelector('form')

window.addEventListener('load', async event => {
  const response = await fetch('/api/usuarios/current')

  if (response.status === 200) {
    const { payload: usuario } = await response.json()
    const [nombre, apellido, email] = document.querySelectorAll('span')

    nombre.innerHTML = usuario.nombre
    apellido.innerHTML = usuario.apellido
    email.innerHTML = usuario.email

  } else {
    const error = await response.json()
    alert(error.message)
    window.location.href = '/login'
  }
})

formLogout?.addEventListener('submit', async event => {
  event.preventDefault()

  const response = await fetch('/api/sesiones/current', {
    method: 'DELETE'
  })

  if (response.status === 200) {
    window.location.href = '/login'
  } else {
    const error = await response.json()
    alert(error.message)
  }
})