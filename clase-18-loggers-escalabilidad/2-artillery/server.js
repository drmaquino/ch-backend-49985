import express from 'express'

const app = express()

app.get('/operacionsencilla', (req, res) => {
  let sum = 0
  for (let i = 0; i < 1_000_000; i++) {
    sum += i
  }
  res.json({ sum })
})

app.get('/operacioncompleja', (req, res) => {
  let sum = 0
  for (let i = 0; i < 500_000_000; i++) {
    sum += i
  }
  res.json({ sum })
})

app.listen(8080, () => { console.log('escuchando en 8080!') })