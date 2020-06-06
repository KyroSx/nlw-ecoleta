import { celebrate, Joi, Segments } from 'celebrate'

class PointsValidator {
  validateIndex () {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.number().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required()
      })
    })
  }
}

export default PointsValidator
