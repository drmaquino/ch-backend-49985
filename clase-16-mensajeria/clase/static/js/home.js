let juguetes = []

window.onload = actualizarJuguetes

async function actualizarJuguetes() {
  try {
    const juguetes = await obtenerJuguetes()
    mostrarJuguetes(juguetes)
  } catch (error) {
    alert(error.message)
  }
}

async function obtenerJuguetes() {
  const res = await fetch('/api/juguetes')
  const obj = await res.json()
  juguetes = obj.payload
  return juguetes
}

function mostrarJuguetes(juguetes) {
  // @ts-ignore
  document.querySelector('#listaJuguetes').innerHTML =
    juguetes.map(j => `- ${j.nombre} $${j.precio}`).join('<br>')
}

const formAgregarJuguete = document.querySelector('form')
formAgregarJuguete?.addEventListener('submit', async event => {
  event.preventDefault()

  const response = await fetch('/api/juguetes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // @ts-ignore
    body: new URLSearchParams(new FormData(formAgregarJuguete))
  })

  if (response.status === 201) {
    actualizarJuguetes()
  } else {
    const error = await response.json()
    alert(error.message)
  }

})