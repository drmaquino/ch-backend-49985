export function metodosPersonalizados(req, res, next) {
  res['successfullGet'] = payload => {
    res.json({
      status: 'success',
      payload
    })
  }
  res['successfullPost'] = payload => {
    res.status(201).json({
      status: 'success',
      payload
    })
  }
  res['successfullPut'] = payload => {
    res.json({
      status: 'success',
      payload
    })
  }
  next()
}