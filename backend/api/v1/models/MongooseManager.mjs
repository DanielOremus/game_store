class MongooseManager {
  constructor(model) {
    this.model = model
  }
  addPopulation(query, populateFields) {
    for (const field of populateFields) {
      if (typeof field === "string") {
        query.populate(field)
        continue
      }
      if (typeof field === "object" && field.path && field.requiredFields) {
        query.populate(field.path, field.requiredFields)
      }
    }
  }
  async findMany(filters, projection = {}, options = {}, populateFields = []) {
    try {
      const query = this.model.find(filters, projection, options)
      const count = await this.model.countDocuments(query)

      this.addPopulation(query, populateFields)

      const documents = await query.exec()
      return {
        documents,
        count,
      }
    } catch (error) {
      throw new Error("Error fetching data: ", +error.message)
    }
  }
  async findManyWithQuery(reqQuery, projection, fieldsConfiguration) {}
  async findById(id, projection = {}, populateFields = []) {
    try {
      const query = this.model.findById(id, projection)
      this.addPopulation(query, populateFields)

      return await query.exec()
    } catch (error) {
      throw new Error("Error fetching item by id: " + error.message)
    }
  }
  async findOne(filters, projection = {}, populateFields = []) {
    try {
      console.log(populateFields)

      const query = this.model.findOne(filters, projection)
      this.addPopulation(query, populateFields)

      return await query.exec()
    } catch (error) {
      throw new Error("Error fetching item: " + error.message)
    }
  }
  async create(itemObj) {
    try {
      const item = new this.model(itemObj)
      return await item.save()
    } catch (error) {
      throw new Error("Error creating item: " + error.message)
    }
  }
  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id)
    } catch (error) {
      throw new Error("Error deleting item by id: " + error.message)
    }
  }
  async deleteOne(filters) {
    try {
      return this.model.findOneAndDelete(filters)
    } catch (error) {
      throw new Error("Error deleting item by filters: " + error.message)
    }
  }
  async updateById(id, itemObj) {
    try {
      return await this.model.findByIdAndUpdate(id, itemObj, {
        runValidators: true,
        new: true,
      })
    } catch (error) {
      throw new Error("Error updating item by id: " + error.message)
    }
  }
}

export default MongooseManager
