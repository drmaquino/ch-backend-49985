// no es necesario para la funcionalidad basica implementada

// const formLogout = document.querySelector('form')

// formLogout?.addEventListener('submit', async event => {
//   event.preventDefault()

//   const response = await fetch('/api/sesiones/logout', {
//     method: 'POST'
//   })

//   if (response.status === 200) {
//     window.location.href = '/login'
//   } else {
//     const error = await response.json()
//     alert(error.message)
//   }
// })