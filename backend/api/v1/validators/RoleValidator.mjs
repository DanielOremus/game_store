import RoleManager from "../models/role/RoleManager.mjs"
class RoleValidator {
  static schema = {
    title: {
      trim: true,
      notEmpty: {
        errorMessage: "Title is required",
      },
      custom: {
        options: async (value) => {
          const exists = await RoleManager.findOne(
            { title: { $eq: value } },
            { _id: 1 }
          )
          if (exists) throw new Error("Role with this name already exists")
          return true
        },
      },
    },
    pagesPermissions: {
      isObject: {
        options: {
          strict: true,
        },
        errorMessage: "Pages permissions must be an object",
      },
    },
  }
}

export default RoleValidator
