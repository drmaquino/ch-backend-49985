async function eliminarPublicacion(idAutor, idPublicacion) {
  const response = await fetch(`/api/usuarios/${idAutor}/publicaciones/${idPublicacion}`, {
    method: 'DELETE'
  })
  if (response.status === 200) {
    window.location.href = '/publicaciones'
  } else {
    const error = await response.json()
    console.log(error)
  }
}