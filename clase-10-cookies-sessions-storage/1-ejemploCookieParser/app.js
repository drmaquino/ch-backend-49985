import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

// app.use(cookieParser())
app.use(cookieParser('codersecret'))

app.use(showCookies)

app.get('/setCookie', (req, res) => {
  res.cookie('CoderCookie', 'Esta es una cookie muy poderosa', {
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 año
  })
  res.send('la cookie fue guardada con éxito')
})

app.get('/getCookies', (req, res) => {
  console.log(req.cookies)
  res.send(req.cookies)
})

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('CoderCookie')
  res.send('Cookie removed')
})

app.get('/setSignedCookie', (req, res) => {
  res.cookie('SignedCookie', 'Esta es una cookie muy poderosa', { signed: true })
  res.send('la cookie firmada fue guardada con éxito')
})

app.get('/getSignedCookies', (req, res) => {
  res.send(req.signedCookies)
})

app.get('/', (req, res) => {
  res.send('home!')
})


const PORT = 8080
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`)
})

function showCookies(req, res, next) {
  console.log('cookies:')
  console.dir(req.cookies)
  console.log('cookies firmadas:')
  console.dir(req.signedCookies)
  next()
}