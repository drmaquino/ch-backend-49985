// no es necesario para la funcionalidad basica implementada

// const formRegister = document.querySelector('form')

// formRegister?.addEventListener('submit', async event => {
//   event.preventDefault()

//   const response = await fetch('/api/usuarios', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     // @ts-ignore
//     body: new URLSearchParams(new FormData(formRegister))
//   })

//   if (response.status === 201) {
//     window.location.href = '/login'
//   } else {
//     const error = await response.json()
//     alert(error.message)
//   }
// })
