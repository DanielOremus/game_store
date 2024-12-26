import mongoose from "mongoose"
import FileManager from "../../../../utils/FileManager.mjs"
const gameSchema = new mongoose.Schema({
  imgSrc: {
    type: String,
    required: true,
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
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be a positive number"],
  },

  sale: {
    type: Number,
    default: 0,
    min: [0, "Sale must be at least 0"],
    max: [1, "Sale must be at most 1"],
  },
  platforms: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Platform" }],
    default: [],
    validate: {
      validator: (v) => {
        return Array.isArray(v) && v.length > 0
      },
      message: "At least 1 platform must be attached",
    },
  },
})

gameSchema.post("findOneAndDelete", function (doc) {
  FileManager.removeSync(doc.imgSrc)
})

export default mongoose.model("Game", gameSchema)
