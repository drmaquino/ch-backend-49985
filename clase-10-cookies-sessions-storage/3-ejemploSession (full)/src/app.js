import express from 'express'
import session from './middlewares/sesiones.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session('SecretCoder'))

app.get('/', (req, res) => {
  if (req.session['counter']) {
    req.session['counter']++
    res.send(`Has visitado esta ruta ${req.session['counter']} veces`)
  } else {
    req.session['counter'] = 1
    res.send(`Bienvenido!`)
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ status: 'logout error', body: err })
    }
    res.send('logout OK!')
  })
})

app.listen(8080, () => console.log("Listening on 8080"))