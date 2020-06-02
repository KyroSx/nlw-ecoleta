// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController {
  async create (request: Request, response: Response) {
    const {
      name, email, whatsapp, latitude,
      longitude, city, uf, items
    } = request.body

    const trx = await knex.transaction()

    const point = {
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      uf,
      city
    }

    const ids = await trx('points').insert(point)

    const idPoint = ids[0]

    const pointItems = items.map((itemID: number) => {
      return {
        item_id: itemID,
        point_id: idPoint
      }
    })

    await trx('point_items').insert(pointItems)

    return response.json({
      id: idPoint,
      ...point
    })
  }
}

export default PointsController
