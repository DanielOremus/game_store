import mongoose, { Schema } from "mongoose"
import FileManager from "../../../../utils/FileManager.mjs"

const mediaSchema = new Schema({
  src: {
    type: String,
  },
  mimetype: {
    type: String,
  },
})

const gameSchema = new Schema(
  {
    mainImgSrc: {
      type: String,
      required: true,
    },
    gallery: {
      type: [mediaSchema],
      default: [],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 chars long"],
      maxLength: [50, "Name must be at most 50 chars long"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
      minLength: [10, "Description must be at least 10 chars long"],
    },
    price: {
      type: Schema.Types.Double,
      required: [true, "Price is required"],
      min: [1, "Price must be a positive number"],
    },
    genre: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
      default: [],
      validate: {
        validator: (v) => {
          return Array.isArray(v) && v.length > 0
        },
        message: "At least 1 genre must be attached",
      },
    },
    sale: {
      type: Schema.Types.Double,
      default: 0,
      min: [0, "Sale must be at least 0"],
      max: [1, "Sale must be at most 1"],
    },
    platform: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Platform" }],
      default: [],
      validate: {
        validator: (v) => {
          return Array.isArray(v) && v.length > 0
        },
        message: "At least 1 platform must be attached",
      },
    },
    releaseDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

gameSchema.virtual("sale_price").get(function () {
  return Math.ceil(this.price * (1 - this.sale)) - 0.01
})

gameSchema.post("findOneAndDelete", function (doc) {
  const gallerySrc = doc.gallery.map((el) => el.src)
  const mediaToDelete = [...gallerySrc, doc.mainImgSrc]
  mediaToDelete.forEach((path) => FileManager.removeSync(path))
})

export default mongoose.model("Game", gameSchema)
