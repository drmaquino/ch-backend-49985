import { ordersService } from '../services/orders.service.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      res.json(await ordersService.readOne({ _id: req.params.id }))
    } else {
      res.json(await ordersService.readMany(req.query))
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    res.status(201).json(await ordersService.create(req.body))
  } catch (error) {
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    res.json(await ordersService.resolve(req.params.id, req.body.status))
  } catch (error) {
    next(error)
  }
}
