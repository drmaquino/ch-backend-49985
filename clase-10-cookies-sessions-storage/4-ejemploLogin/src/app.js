import express from 'express'
import session from 'express-session'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'SecretCoder',
  resave: true,
  saveUninitialized: true
}))

app.get('/login', (req, res) => {
  const { username, password } = req.query
  if (username !== 'marian' || password !== 'profe') {
    return res.status(400).send('login failed')
  }
  req.session['user'] = username
  req.session['admin'] = true
  res.send('login success')
})

function auth(req, res, next) {
  if (!req.session.admin) {
    return res.status(400).send('no tienes autorizacion!')
  }
  next()
}

app.get('/privado', auth, (req, res) => {
  res.send('si estas viendo esto es porque ya te logueaste!')
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