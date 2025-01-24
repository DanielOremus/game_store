import MongooseManager from "../MongooseManager.mjs"
import Game from "./Game.mjs"

class GameManager extends MongooseManager {
  static fieldsConfig = [
    {
      fieldName: "name",
      filterCategory: "search",
    },
    {
      fieldName: "price",
      filterCategory: "range",
    },
    {
      fieldName: "platform",
      filterCategory: "list",
    },
    {
      fieldName: "genre",
      filterCategory: "list",
    },
    {
      fieldName: "category",
      filterCategory: "custom",
    },
  ]
  static customFiltersConfig = {
    sales: (query) => query.where("sale").ne(0),
  }
  async getAll() {
    try {
      const { documents, count } = await super.findMany(null, null, null, [
        "platform",
      ])
      return {
        documents,
        count,
      }
    } catch (error) {
      return { documents: [], count: 0 }
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
        GameManager.fieldsConfig,
        GameManager.customFiltersConfig,
        populateFields
      )
      return { documents, count }
    } catch (error) {
      return { documents: [], count: 0 }
    }
  }
}

export default new GameManager(Game)
