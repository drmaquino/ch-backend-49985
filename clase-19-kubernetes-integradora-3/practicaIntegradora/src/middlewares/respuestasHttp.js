export const respuestasHttp = (req, res, next) => {
  res['created'] = (payload) => {
    res.status(201).json({ status: 'success', payload })
  }
  res['ok'] = () => {
    res.status(204).json({ status: 'success' })
  }
  res['jsonOk'] = (payload) => {
    res.json({ status: 'success', payload })
  }
  res['jsonError'] = (error) => {
    res.json({ status: 'error', message: error.message, error })
  }
  next()
}