import SelectionHelper from "./SelectionHelper.mjs"

class GamesHelper extends SelectionHelper {
  static applyFilters(query, filters, categoryConfig) {
    query = super.applyFilters(query, filters)
    const categoryFilter = filters.find((el) => el.filterType === "category")
    if (categoryFilter) {
      if (categoryConfig[categoryFilter.fieldName]) {
        categoryConfig[categoryFilter.fieldName](query)
      } else {
        console.log(
          `Unsupported category fieldName: ${categoryFilter.fieldName}`
        )
      }
    }
    return query
  }
}

export default GamesHelper
