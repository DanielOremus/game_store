import mongoose from "mongoose"
const cartGameSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [1, "Amount must be positive"],
    validate: {
      validator: (v) => Number.isInteger(v),
      message: "Amount must be an integer",
    },
  },
})

const cartSchema = new mongoose.Schema({
  games: [cartGameSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
})

export default mongoose.model("Cart", cartSchema)
