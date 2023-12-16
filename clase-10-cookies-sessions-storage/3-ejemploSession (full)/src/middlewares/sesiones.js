import session from 'express-session'

export default function (palabraSecreta) {
  return session({
    secret: palabraSecreta,
    resave: true,
    saveUninitialized: true
  })
}