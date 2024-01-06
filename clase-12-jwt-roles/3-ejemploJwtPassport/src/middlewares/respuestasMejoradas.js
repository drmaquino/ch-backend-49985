export function respuestasMejoradas(req, res, next) {
  res.creado = (objCreado, otrosCampos) => {
    res.status(201)
    res.json({
      status: 'success',
      payload: JSON.parse(JSON.stringify(objCreado)),
      ...otrosCampos
    })
  }

  res.ok = (result) => {
    res.status(200)
    res.json({
      status: 'success',
      payload: JSON.parse(JSON.stringify(result)),
    })
  }

  res.notFound = (message) => {
    res.status(404)
    res.json({
      status: 'error',
      message
    })
  }

  next()
} 