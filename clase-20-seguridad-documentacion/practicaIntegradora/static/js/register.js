const formRegister = document.querySelector('form')

formRegister?.addEventListener('submit', async event => {
  event.preventDefault()

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // @ts-ignore
    body: new URLSearchParams(new FormData(formRegister))
  })

  if (response.status === 201) {
    window.location.href = '/profile'
  } else {
    const error = await response.json()
    alert(error.message)
  }
})
