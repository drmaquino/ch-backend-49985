export function onlyLogueadosRest(req, res, next) {
  if (!req.session['user']) {
    return res
      .status(403)
      .json({
        status: 'error',
        message: 'no tenes permiso para ver esto. solo para usuarios logueados!'
      })
  }
  next()
}

export function onlyLogueadosWeb(req, res, next) {
  if (!req.session['user']) {
    return res.redirect('/login')
  }
  next()
}