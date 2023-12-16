import express from 'express'
import session from './middlewares/sesiones.js'

const app = express()

app.use(session({
  secret: 'secreto'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  if (!req['sesion']['counter']) {
    req['sesion']['counter'] = 1
    res.send(`Bienvenido!`)
  } else {

    req['sesion']['counter']++
    res.send(`Has visitado esta ruta ${req['sesion']['counter']} veces`)
  }
})

app.get('/logout', (req, res) => {
  req['borrarSesion']()
  res.send('logout ok')
})

app.listen(8080, () => console.log("Listening on 8080"))