const formActualizacion = document.querySelector('form')

const idUsuarioActualizacion = new URLSearchParams(window.location.search).get('id')

if (idUsuarioActualizacion) {

  formActualizacion?.addEventListener('submit', async event => {
    event.preventDefault()

    try {
      const res = await fetch(
        `/api/usuarios/${idUsuarioActualizacion}`,
        {
          method: 'PUT',
          body: new FormData(formActualizacion),
        },
      )

      const resData = await res.json()

      if (res.status === 200) {
        window.location.href = `/usuarios?id=${resData._id}`
      } else {
        console.log(resData)
      }
    } catch (err) {
      console.log(err.message)
    }
  })
}