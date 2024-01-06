const formRegister = document.querySelector('form')
const inputPassword = document.querySelector('#inputPassword')

formRegister?.addEventListener('submit', async event => {
  event.preventDefault()

  const formData = new FormData(formRegister)
  // @ts-ignore
  // formData.append('password', inputPassword.value)
  // @ts-ignore
  const body = new URLSearchParams(formData)

  const response = await fetch('/api/users', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (response.status === 201) { // Created
    const data = await response.json()
    console.log(data)
    localStorage.setItem('accessToken', data.accessToken)
    console.log(JSON.stringify(data.payload))
    window.location.href = '/'
  } else {
    const error = await response.json()
    console.log(JSON.stringify(error))
    alert('registration failed!')
  }
})