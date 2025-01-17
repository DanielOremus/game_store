import Joi from "joi"

class ProfileValidator {
  static passwordSchema = Joi.object({
    oldPassword: Joi.string().trim().required().messages({
      "string.base": "Password is required",
      "string.empty": "Password is required",
    }),
    newPassword: Joi.string().trim().required().min(4).messages({
      "string.base": "Password must be at least 4 characters long",
      "string.empty": "Password must be at least 4 characters long",
      "string.min": "Password must be at least 4 characters long",
    }),
  })
  static mainSchema = Joi.object({
    firstName: Joi.string().trim().required().min(3).max(10).messages({
      "string.base": "First name is required",

      "string.empty": "First name is required",
      "string.min": "First name must be at least 3 characters long",
      "string.max": "First name must be at most 10 characters long",
    }),
    lastName: Joi.string().trim().required().min(3).max(15).messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 3 characters long",
      "string.max": "Last name must be at most 15 characters long",
    }),
  })
  static emailSchema = Joi.object({
    newEmail: Joi.string()
      .trim()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .messages({
        "string.base": "Email is required",
        "string.empty": "Email is required",
        "string.email": "Oops! That doesn’t look like a valid email address",
      }),
  })
}

export default ProfileValidator
