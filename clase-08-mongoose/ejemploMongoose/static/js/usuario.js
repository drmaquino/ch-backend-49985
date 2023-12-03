const nuevaPublicacion = document.querySelector('form')

const idUsuario = new URLSearchParams(window.location.search).get('id')

if (idUsuario) {
  nuevaPublicacion?.addEventListener('submit', async event => {
    event.preventDefault()

    const formData = new FormData(nuevaPublicacion)
    formData.append('idAutor', idUsuario)

    try {
      const res = await fetch(
        `/api/usuarios/${idUsuario}/publicaciones`, {
        method: 'POST',
        body: formData
      })
      const resData = await res.json()

      if (res.status === 201) {
        window.location.href = `/publicaciones?id=${resData._id}`
      } else {
        console.log(resData)
      }
    } catch (err) {
      console.log(err.message)
    }
  })
}

async function eliminarUsuario() {
  const response = await fetch(`/api/usuarios/${idUsuario}`, {
    method: 'DELETE'
  })
  if (response.status === 200) {
    window.location.href = '/usuarios'
  } else {
    const error = await response.json()
    console.log(error)
  }
}

