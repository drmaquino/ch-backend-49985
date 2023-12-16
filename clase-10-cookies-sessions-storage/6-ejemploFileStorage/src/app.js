import express from 'express'
import session from 'express-session'

import createFileStoreClass from 'session-file-store'
const FileStore = createFileStoreClass(session)
const store = new FileStore({
  path: './sesiones',
  //  ttl: 3600,
  // retries: 5
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function showCookies(req, res, next) {
  console.dir(req.session)
  next()
}

app.use(session({
  store,
  secret: 'SecretCoder',
  resave: true,
  saveUninitialized: true
}))

app.use(showCookies)

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