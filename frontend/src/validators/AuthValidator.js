import Joi from "joi"

class AuthValidator {
  static loginSchema = Joi.object({
    email: Joi.string().trim().required().messages({
      "string.empty": "Email is required",
    }),
    password: Joi.string().trim().required().messages({
      "string.empty": "Password is required",
    }),
  })
  static registerSchema = Joi.object({
    firstName: Joi.string().trim().required().min(3).max(10).messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 3 characters long",
      "string.max": "First name must be at most 10 characters long",
    }),
    lastName: Joi.string().trim().required().min(3).max(15).messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 3 characters long",
      "string.max": "Last name must be at most 15 characters long",
    }),
    email: Joi.string()
      .trim()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .messages({
        "string.empty": "Email is required",
        "string.email": "Oops! That doesn’t look like a valid email address",
      }),
    password: Joi.string().trim().required().min(4).messages({
      "string.empty": "Password must be at least 4 characters long",
      "string.min": "Password must be at least 4 characters long",
    }),
  })
}

export default AuthValidator
