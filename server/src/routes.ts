import express from 'express'

import upload from './config/multer'

import PointsValidator from './validations/PointsValidator'
import ItemsController from './controllers/ItemsController'
import PointsController from './controllers/PointsController'

const routes = express.Router()

const pointsValidator = new PointsValidator()

const pointsController = new PointsController()
const itemsController = new ItemsController()

routes.get('/items', itemsController.index)

routes.post(
  '/points',
  upload.single('image'),
  pointsValidator.validateIndex(),
  pointsController.create
)

routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

export default routes
