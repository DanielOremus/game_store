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
  async findManyWithSearchOptions(
    reqQuery,
    projection = {},
    populateFields = []
  ) {
    try {
      const { documents, count } = await super.findManyWithQuery(
        reqQuery,
        projection,
        UserManager.fieldsConfig,
        null,
        populateFields
      )
      return { documents, count }
    } catch (error) {
      return { documents: [], count: 0 }
    }
  }
  async updateById(id, userObj) {
    try {
      const user = await super.updateById(id, userObj, ["role"])
      return user
    } catch (error) {
      throw error
    }
  }
}

export default new UserManager(User)
