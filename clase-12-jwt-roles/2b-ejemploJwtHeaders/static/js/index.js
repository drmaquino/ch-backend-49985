const content = document.querySelector('#content')

window.addEventListener('load', async function () {
  const response = await fetch(`/api/usuarios/current`, {
    headers: {
      'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
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
      localStorage.removeItem('accessToken')
      window.location.reload()
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