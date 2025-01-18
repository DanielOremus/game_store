import mongoose from "mongoose"
import config from "../../../../config/default.mjs"
const tokenSchema = {
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: config.tokensAliveTime.passwordReset.hours * 3600,
  },
}

export default mongoose.model("reset_token", tokenSchema)
