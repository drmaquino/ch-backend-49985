/** @type {HTMLInputElement | null} */
const inputNombre = document.querySelector('#inputNombre')
/** @type {HTMLInputElement | null} */
const inputEdad = document.querySelector('#inputEdad')

document.querySelector('form')?.addEventListener('submit', event => {
  event.preventDefault()
  fetch('/api/personas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: inputNombre?.value,
      edad: inputEdad?.value
    })
  })
})