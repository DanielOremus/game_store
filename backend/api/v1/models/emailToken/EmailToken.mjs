import mongoose from "mongoose"
import config from "../../../../config/default.mjs"

const emailTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  newEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: config.tokensAliveTime.emailUpdate.hours * 3600,
  },
})

export default mongoose.model("email_token", emailTokenSchema)
