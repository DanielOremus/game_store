class GameValidator {
  static schema = {
    image: {
      custom: {
        options: (v, { req }) => {
          if (req.params.id || req.file) return true
          throw new Error("Image must be attached")
        },
      },
    },
    name: {
      trim: true,
      isLength: {
        options: {
          min: 3,
          max: 50,
        },
        errorMessage: "Name must be 3-50 characters long",
      },
      escape: true,
    },
    description: {
      trim: true,
      isLength: {
        options: {
          min: 10,
        },
        errorMessage: "Description must be at least 3 characters long",
      },
      escape: true,
    },
    price: {
      isInt: {
        options: {
          min: 1,
        },
        errorMessage: "Price must be a positive number",
      },
    },
    sale: {
      custom: {
        options: (v) => {
          if (!v || (v >= 0 && v <= 1)) return true
          throw new Error("Sale must be 0-1")
        },
      },
    },
    platforms: {
      custom: {
        options: (v) => {
          if (typeof v === "string") return true
          if (Array.isArray(v)) {
            if (v.length > 0) return true
          }
          throw new Error("At least 1 platform must be attached")
        },
      },
    },
  }
}

export default GameValidator
