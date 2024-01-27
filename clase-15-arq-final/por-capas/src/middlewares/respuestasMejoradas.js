export function respuestasMejoradas(req, res, next) {
  res['created'] = (payload) => {
    res.status(201).json({ status: 'success', payload })
  }
  res['result'] = (payload) => {
    res.status(200).json({ status: 'success', payload })
  }
  res['deleted'] = () => {
    res.status(204).json({ status: 'success' })
  }
  res['updated'] = () => {
    res.status(204).json({ status: 'success' })
  }
  next()
}