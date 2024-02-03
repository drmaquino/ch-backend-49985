import { businessDao } from '../daos/index.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      res.json(await businessDao.readOne({ _id: req.params.id }))
    } else {
      res.json(await businessDao.readMany(req.query))
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    res.json(await businessDao.create(req.body))
  } catch (error) {
    next(error)
  }
}
