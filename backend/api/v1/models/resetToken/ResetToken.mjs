import mongoose from "mongoose"

const tokenSchema = {
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7200,
  },
}

export default mongoose.model("ResetToken", tokenSchema)
