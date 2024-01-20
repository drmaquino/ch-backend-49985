export function respuestasMejoradas(req, res, next) {
  res['created'] = (payload) => {
    res.status(201).json({ status: 'success', payload })
  }
  res['result'] = (payload) => {
    res.status(200).json({ status: 'success', payload })
  }
  next()
}