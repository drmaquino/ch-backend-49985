import { Router } from 'express'
import { petManager } from '../models/Pet.js'

export const router = Router()

router.param('pet', (req, res, next, pet) => {
  req['pet'] = pet
  next()
})

router.get('/:pet([a-z]+)', async (req, res, next) => {
  try {
    const pet = await petManager.findOne({ name: req['pet'] })
    if (!pet) {
      throw new Error('ERROR_NOT_FOUND')
    }
    res['successfullGet'](pet)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newPet = await petManager.create(req.body)
    res['successfullPost'](newPet)
  } catch (error) {
    next(error)
  }
})

router.put('/:pet([a-z]+)', async (req, res, next) => {
  try {
    const updatedPet = await petManager.findOneAndUpdate(
      { name: req['pet'] },
      { adopted: true },
      { new: true }
    )
    if (!updatedPet) {
      throw new Error('ERROR_NOT_FOUND')
    }
    res['successfullPut'](updatedPet)
  } catch (error) {
    next(error)
  }
})

router.all('*', (req, res) => {
  res.json({
    status: 'error',
    message: 'endpoint does not exist'
  })
})

router.use((error, req, res, next) => {
  switch (true) {
    case error.message.startsWith('ERROR_NOT_FOUND'):
      error.message = 'not found'
      res.status(404); break
    case error.message.split(' ').includes('duplicate'):
      error.message = 'attribute is not unique: ' + JSON.stringify(error.keyValue)
      res.status(409); break
    case error.message.split(' ').includes('validation'):
      res.status(400); break
    default:
      res.status(500)
  }

  res.json({
    status: 'error',
    message: error.message,
  })
})
