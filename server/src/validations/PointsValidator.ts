import { celebrate, Joi, Segments } from 'celebrate'

class PointsValidator {
  dontAbortEarly = {
    abortEarly: false
  }

  validateIndex () {
    const bodyValidation = {
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required()
      })
    }

    const celebrateConfig = celebrate(
      bodyValidation, this.dontAbortEarly)

    return celebrateConfig
  }
}

export default PointsValidator
