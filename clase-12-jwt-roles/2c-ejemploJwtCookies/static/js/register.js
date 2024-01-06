const formRegister = document.querySelector('form')
formRegister?.addEventListener('submit', async event => {
  event.preventDefault()
  const response = await fetch('/api/usuarios', {
    method: 'post',
    // @ts-ignore
    body: new URLSearchParams(new FormData(formRegister)),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  if (response.status === 201) {
    const data = await response.json()
    console.log(data)
    window.location.href = '/'
  } else {
    const error = await response.json()
    console.log(JSON.stringify(error))
    alert('registration failed!')
  }
})