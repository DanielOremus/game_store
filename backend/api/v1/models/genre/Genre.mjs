import mongoose from "mongoose"

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Genre name is required"],
    minLength: [3, "Genre name must be at least 3 chars long"],
    maxLength: [20, "Genre name must be at least 20 chars long"],
  },
})

export default mongoose.model("Genre", genreSchema)
