const content = document.querySelector('#content')

window.addEventListener('load', async function () {
  const response = await fetch(`/api/usuarios/current`)
  if (response.status === 200) {
    const data = await response.json()
    console.log(JSON.stringify(data))

    const pInfo = document.createElement('p')
    pInfo.innerHTML = JSON.stringify(data)
    content?.appendChild(pInfo)

    const aLogout = document.createElement('a')
    aLogout.innerHTML = 'logout'
    aLogout.href = '#'
    aLogout.onclick = () => {
      fetch('/api/sesiones/current', { method: 'DELETE' }).then(async response => {
        if (response.status !== 204) {
          const error = await response.text()
          console.log(error)
        }
        window.location.href = '/login'
      })
    }
    content?.appendChild(aLogout)
  } else {
    const error = await response.json()
    console.log(JSON.stringify(error))

    const pInfo = document.createElement('p')
    pInfo.innerHTML = 'no estas logueado!'
    content?.appendChild(pInfo)

    const aLogin = document.createElement('a')
    aLogin.innerHTML = 'login'
    aLogin.href = '/login'
    content?.appendChild(aLogin)
  }
})