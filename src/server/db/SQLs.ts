const fieldsJoined = (fields: Array<string>, prefix = '') => {
  const prefixString = prefix ? `${prefix}.` : ''
  return fields.map((field) => `${prefixString}${field}`).join(', ')
}

export const SQLs = {
  fieldsJoined,
}
