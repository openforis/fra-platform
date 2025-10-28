const fieldsJoined = (fields: Array<string>, prefix = ''): string => {
  const prefixString = prefix ? `${prefix}.` : ''
  return fields.map((field) => `${prefixString}${field}`).join(', ')
}

export const SQLs = {
  fieldsJoined,
}
