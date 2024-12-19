import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxLength: [15, "First name must be at most 15 chars long"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    maxLength: [15, "Last name must be at most 15 chars long"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
})
userSchema.set("toObject", { virtuals: true })
userSchema.set("toJSON", { virtuals: true })

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await this.constructor.hashPassword(this.password, 10)
  }
  next()
})
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate()
  if (update.password) {
    update.password = await this.model.hashPassword(update.password, 10)
  }
  next()
})

userSchema.statics.hashPassword = async function (password, saltRounds = 10) {
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function (userPassword) {
  try {
    return await bcrypt.compare(userPassword, this.password)
  } catch (error) {
    console.log(error)
  }
}

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

export default mongoose.model("User", userSchema)