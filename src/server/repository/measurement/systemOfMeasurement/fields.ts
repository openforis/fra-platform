export const fields: Array<string> = ['uuid', 'name', 'conversion_factors', 'base_unit_uuid']

export const fieldsJoined = (prefix = '') => {
  const prefixString = prefix ? `${prefix}.` : ''
  return fields.map((field) => `${prefixString}${field}`).join(', ')
}
