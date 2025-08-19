export const flatten = (obj: Record<string, unknown>, prefix = ''): Record<string, unknown> => {
  const result: Record<string, unknown> = {}

  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    const newKey = prefix ? `${prefix}.${key}` : key

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively flatten nested objects
      Object.assign(result, flatten(value as Record<string, unknown>, newKey))
    } else {
      // Keep primitive values and arrays as-is
      result[newKey] = value
    }
  })

  return result
}
