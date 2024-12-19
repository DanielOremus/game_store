import MongooseManager from "../MongooseManager.mjs"
import Role from "./Role.mjs"

class RoleManager extends MongooseManager {
  async findOne(filters = {}, projection = {}) {
    try {
      return await super.findOne(filters, projection, [])
    } catch (error) {
      throw error
    }
  }
}

export default new RoleManager(Role)
