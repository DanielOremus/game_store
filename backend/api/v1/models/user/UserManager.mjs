import MongooseManager from "../MongooseManager.mjs"
import User from "./User.mjs"
class UserManager extends MongooseManager {
  async findMany(
    filters = {},
    projection = {},
    options = {},
    populateFields = []
  ) {
    try {
      const { documents, count } = await super.findMany(
        filters,
        projection,
        options,
        populateFields
      )
      return { documents, count }
    } catch (error) {
      return []
    }
  }
  async findById(id, projection = {}, populateFields = []) {
    try {
      const user = await super.findById(id, projection, populateFields)
      return user
    } catch (error) {
      throw error
    }
  }
  async findOne(filters = {}, projection = {}, populateFields = []) {
    try {
      const user = await super.findOne(filters, projection, populateFields)
      return user
    } catch (error) {
      throw error
    }
  }
}

export default new UserManager(User)
