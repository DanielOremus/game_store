import mongoose, { Schema } from "mongoose"
const permissionsSchema = new Schema({
  create: {
    type: Boolean,
    default: false,
  },
  read: {
    type: Boolean,
    default: false,
  },
  update: {
    type: Boolean,
    default: false,
  },
  delete: {
    type: Boolean,
    default: false,
  },
})

const roleSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
    maxLength: [30, "Title must be at most 30 chars long"],
    trim: true,
  },
  pagesPermissions: {
    games: {
      type: permissionsSchema,
      default: {},
    },
    carts: {
      type: permissionsSchema,
      default: {},
    },
    roles: {
      type: permissionsSchema,
      default: {},
    },
    users: {
      type: permissionsSchema,
      default: {},
    },
  },
})

//TODO: set guest role when user role is deleted

export default mongoose.model("Role", roleSchema)
