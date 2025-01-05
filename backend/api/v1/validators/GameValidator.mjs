class GameValidator {
  static schema = {
    mainImg: {
      custom: {
        options: (v, { req }) => {
          if (req.params.id || req.file) return true

          throw new Error("Main Image must be attached")
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
    platform: {
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
    genre: {
      custom: {
        options: (v) => {
          if (typeof v === "string") return true
          if (Array.isArray(v)) {
            if (v.length > 0) return true
          }
          throw new Error("At least 1 genre must be attached")
        },
      },
    },
  }
  static gallerySchema = {
    gallery: {
      custom: {
        options: (v, { req }) => {
          if (req.files && req.files.length > 0) return true
          throw new Error("No media files uploaded")
        },
      },
    },
  }
}

export default GameValidator
