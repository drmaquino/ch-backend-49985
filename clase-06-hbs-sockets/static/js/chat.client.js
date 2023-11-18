const form = document.querySelector('form')
const inputMensaje = document.querySelector('input')
const ulMensajes = document.querySelector('ul')

// @ts-ignore
Swal.fire({
  title: "Bienvenido al chat! Ingrese su nombre de usuario",
  input: "text",
  showCancelButton: true,
  confirmButtonText: "Entrar",
  allowOutsideClick: false
}).then((result) => {
  if (result.isConfirmed) {
    iniciarChat(result.value)
    inputMensaje?.focus()
  }
})

function iniciarChat(usuario) {
  // @ts-ignore
  const socket = io({
    auth: {
      usuario
    }
  })

  form?.addEventListener('submit', event => {
    event.preventDefault()
    const texto = inputMensaje?.value
    if (texto) {
      socket.emit('mensaje', {
        timestamp: Date.now(),
        usuario,
        texto
      })
      form.reset()
    }
  })

  socket.on('nuevoUsuario', nuevoUsuario => {
    // @ts-ignore
    Swal.fire({
      text: 'nuevo usuario: ' + nuevoUsuario,
      toast: true,
      position: 'top-right'
    })
  })

  socket.on('usuarioDesconectado', usuarioDesconectado => {
    // @ts-ignore
    Swal.fire({
      text: usuarioDesconectado + ' ha abandonado la conversacion',
      toast: true,
      position: 'top-right'
    })
  })

  socket.on('mensajes', mensajes => {
    // @ts-ignore
    ulMensajes.innerHTML = ''
    for (const { timestamp, usuario, texto } of mensajes) {
      const li = document.createElement('li')
      li.innerHTML = `(${new Date(timestamp).toLocaleTimeString()}) ${usuario}: ${texto}`
      ulMensajes?.appendChild(li)
    }
  })
}