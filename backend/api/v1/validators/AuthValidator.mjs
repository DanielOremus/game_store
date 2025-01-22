class AuthValidator {
  static loginSchema = {
    email: {
      trim: true,
      notEmpty: {
        errorMessage: "Email is required",
      },
      normalizeEmail: true,
    },
    password: {
      trim: true,
      notEmpty: {
        errorMessage: "Password is required",
      },
      escape: true,
    },
  }
  static resetPasswordSchema = {
    newPassword: {
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
          if (value !== req.body.newPassword)
            throw new Error("Passwords do not match")
          return true
        },
      },
    },
  }
  static resetLinkSchema = {
    email: {
      trim: true,
      notEmpty: {
        errorMessage: "Email is required",
        bail: true,
      },
      isEmail: {
        errorMessage: "Oops! That doesn’t look like a valid email address",
      },
      normalizeEmail: true,
    },
  }
}

export default AuthValidator
