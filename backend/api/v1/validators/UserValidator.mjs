import UserManager from "../models/user/UserManager.mjs"

class UserValidator {
  static createUserSchema = {
    email: {
      trim: true,
      isEmail: {
        errorMessage: "Oops! That doesn’t look like a valid email address",
      },
      custom: {
        options: async (value) => {
          const user = await UserManager.findOne(
            { email: { $eq: value.toLowerCase() } },
            { _id: 1 }
          )
          if (user) {
            throw new Error("This email is already taken")
          }
          return true
        },
      },
      normalizeEmail: true,
    },
    firstName: {
      trim: true,
      isLength: {
        options: {
          min: 3,
          max: 10,
        },
        errorMessage: "First name must be between 3 and 10 characters long",
      },
      escape: true,
    },
    lastName: {
      trim: true,
      isLength: {
        options: {
          min: 3,
          max: 15,
        },
        errorMessage: "Last name must be between 3 and 15 characters long",
      },
      escape: true,
    },
    password: {
      trim: true,
      isLength: {
        options: {
          min: 4,
        },
        errorMessage: "Password must be at least 4 characters long",
      },
      escape: true,
    },
    confirmPassword: {
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password)
            throw new Error("Passwords do not match")
          return true
        },
      },
    },
  }
  static updateUserSchema = {
    firstName: {
      trim: true,
      isLength: {
        options: {
          min: 3,
          max: 10,
        },
        errorMessage: "First name must be between 3 and 10 characters long",
      },
      escape: true,
    },
    lastName: {
      trim: true,
      isLength: {
        options: {
          min: 3,
          max: 15,
        },
        errorMessage: "Last name must be between 3 and 15 characters long",
      },
      escape: true,
    },
  }
  static updateEmailSchema = {
    newEmail: {
      trim: true,
      isEmail: {
        errorMessage: "Oops! That doesn’t look like a valid email address",
      },
      custom: {
        options: async (value) => {
          const isEmailTaken = await UserManager.findOne(
            { email: { $eq: value.toLowerCase() } },
            { _id: 1 }
          )
          if (isEmailTaken) {
            throw new Error("This email is already taken")
          }
          return true
        },
      },
      normalizeEmail: true,
    },
  }
  static updatePasswordSchema = {
    oldPassword: {
      trim: true,
      notEmpty: {
        bail: true,
        errorMessage: "Old password is required",
      },
    },
    newPassword: {
      trim: true,
      isLength: {
        options: {
          min: 4,
        },
        errorMessage: "Password must be at least 4 characters long",
      },
    },
  }
}

export default UserValidator
