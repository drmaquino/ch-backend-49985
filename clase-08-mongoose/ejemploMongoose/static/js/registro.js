const formNuevoUsuario = document.querySelector('form')

formNuevoUsuario?.addEventListener('submit', async event => {
  event.preventDefault()

  try {
    const res = await fetch(
      '/api/usuarios',
      {
        method: 'POST',
        body: new FormData(formNuevoUsuario),
      },
    )
    const resData = await res.json()

    if (res.status === 201) {
      window.location.href = `/usuarios?id=${resData._id}`
    } else {
      console.log(resData)
    }
  } catch (err) {
    console.log(err.message)
  }
})
