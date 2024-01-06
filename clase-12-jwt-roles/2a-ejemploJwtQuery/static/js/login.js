const formLogin = document.querySelector('form')
formLogin?.addEventListener('submit', async event => {
  event.preventDefault()
  const response = await fetch('/api/sesiones', {
    method: 'post',
    // @ts-ignore
    body: new URLSearchParams(new FormData(formLogin)),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  if (response.status === 201) {
    const data = await response.json()
    console.log(data)
    localStorage.setItem('accessToken', data.accessToken)
    console.log(JSON.stringify(data.payload))
    window.location.href = '/'
  } else {
    const error = await response.json()
    console.log(JSON.stringify(error))
    alert('login failed!')
  }
})