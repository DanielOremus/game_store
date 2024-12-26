import mongoose from "mongoose"
const platformSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Platform name is required"],
    minLength: [3, "Platform name must be at least 3 chars long"],
    maxLength: [20, "Platform name must be at most 20 chars long"],
  },
  //data://img ...
  logo: {
    type: String,
    required: [true, "Platform logo is required"],
  },
  //main page url
  url: {
    type: String,
    required: [true, "Platform url is required"],
  },
})

export default mongoose.model("Platform", platformSchema)
