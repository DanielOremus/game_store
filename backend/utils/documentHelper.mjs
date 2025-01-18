class DocumentHelper {
  static takeOutFields(fieldNameArr, document) {
    const obj = document.toObject()
    fieldNameArr.forEach((fieldName) => delete obj[fieldName])
    return obj
  }
}

export default DocumentHelper
