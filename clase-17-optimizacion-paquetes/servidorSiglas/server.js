import express from 'express'

import { SiglasService } from 'demo-49985'

const siglasService = new SiglasService()

const app = express()

app.get('/', (req, res) => { res.send('OK!') })

app.get('/sigla', (req, res) => {
  const sigla = siglasService.generar(req.query.palabra)
  if (sigla) {
    res.send(sigla)
  } else {
    res.send('error: no hay sigla posible')
  }
})

app.listen(8080)