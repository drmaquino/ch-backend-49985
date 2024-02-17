import express from 'express'

export function levantarServidor(port) {
  const app = express()

  app.get('/health', (req, res) => {
    res.send(`respuesta del proceso #${process.pid}`)
  })

  app.get('/operacionsencilla', (req, res) => {
    let sum = 0
    for (let i = 0; i < 10_000; i++) {
      sum += i
    }
    res.json({ sum })
  })

  app.get('/operacioncompleja', (req, res) => {
    let sum = 0
    for (let i = 0; i < 10_000_000; i++) {
      sum += i
    }
    res.json({ sum })
  })

  app.listen(port, () => { console.log(`escuchando en ${port}!`) })

}

levantarServidor(8080)