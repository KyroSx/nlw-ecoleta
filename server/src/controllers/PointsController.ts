// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import knex from '../database/connection'

const parseItems = (items: string) => {
  return items
    .split(',')
    .map(item => Number(item.trim()))
}

class PointsController {
  async index (request: Request, response: Response) {
    const { city, uf, items } = request.query

    const parsedItems = parseItems(String(items))

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.100.104:3333/uploads/${point.image}`
      }
    })

    return response.json(serializedPoints)
  }

  async show (request: Request, response: Response) {
    const { id } = request.params

    const point = await knex('points')
      .where('id', id)
      .first()

    if (!point) {
      return response.status(400)
        .json({ message: 'Point not found' })
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.100.104:3333/uploads/${point.image}`

    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)

    return response.json({ point: serializedPoint, items })
  }

  async create (request: Request, response: Response) {
    const {
      name, email,
      whatsapp, latitude,
      longitude, city, uf,
      items
    } = request.body

    const trx = await knex.transaction()

    const image = request.file.filename

    const point = {
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }

    const insertedIds = await trx('points').insert(point)

    const pointId = insertedIds[0]

    const parsedItems = parseItems(String(items))

    const pointItems = parsedItems.map((itemId: number) => {
      return {
        item_id: itemId,
        point_id: pointId
      }
    })

    await trx('point_items').insert(pointItems)

    await trx.commit()

    return response.json({
      pointId,
      ...point
    })
  }
}

export default PointsController
