export const getFieldValidationFunc = (schema, field) => {
  return (v) => {
    const partialSchema = schema.extract(field)
    const { error } = partialSchema.validate(v)

    return error ? error.details[0].message : true
  }
}
