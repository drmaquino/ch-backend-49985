const formEdit = document.querySelector('form')
const inputs = document.querySelectorAll('input')

window.addEventListener('load', async event => {
  const response = await fetch('/api/usuarios/current')
  if (response.status === 403) {
    alert('necesitas loguearte para modificar tus datos!')
    return (window.location.href = '/login')
  }

  const result = await response.json()
  const usuario = result.payload

  inputs[0].value = usuario.nombre
  inputs[1].value = usuario.apellido
  inputs[2].value = usuario.email
})

formEdit?.addEventListener('submit', async event => {
  event.preventDefault()

  const formData = new FormData(formEdit)
  // los campos readonly y disabled no se incluyen en el formdata!! 
  formData.append('email', inputs[2].value)

  //@ts-ignore
  const body = new URLSearchParams(formData)

  const response = await fetch('/api/usuarios', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  })

  if (response.status === 200) {
    window.location.href = '/profile'
  } else {
    const error = await response.json()
    alert(error.message)
  }
})
