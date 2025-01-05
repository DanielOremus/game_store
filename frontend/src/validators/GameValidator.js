import Joi from "joi"

class GameValidator {
  static mainSchema = Joi.object({
    //1 - Create
    //2 - Update
    type: Joi.number().required().valid(1, 2),
    name: Joi.string().trim().required().min(3).max(50).messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 chars long",
      "string.max": "Name must be at most 50 chars long",
    }),
    price: Joi.number().required().min(1).messages({
      "any.required": "Price is required",
      "number.base": "Price must be a number",
      "number.min": "Price must be a positive number",
    }),
    sale: Joi.number().allow(null).min(0).max(1).messages({
      "number.min": "Sale must be at least 0",
      "number.max": "Sale must be at most 0",
    }),
    releaseDate: Joi.date().required().less("now").messages({
      "date.base": "Release Date must be a valid date",
      "date.less": "Release date cannot be in the future",
    }),
    genre: Joi.array().min(1).messages({
      "array.min": "At least one genre must be attached",
    }),
    platform: Joi.array().min(1).messages({
      "array.min": "At least one platform must be attached",
    }),
    description: Joi.string().trim().required().min(10).messages({
      "string.empty": "Description is required",
      "string.min": "Description must be at least 10 chars long",
    }),
    mainImg: Joi.alternatives().conditional("type", {
      is: 1,
      then: Joi.any().required().empty(null).messages({
        "any.required": "Main Image must be attached",
      }),
      otherwise: Joi.optional().allow(null),
    }),
  })
}

export default GameValidator
