
// Util function for UI fields which require integer values to be stored
// Gives previous value if new can't be converted to Integer
export const acceptNextInteger = (newValue, currentValue) => {
  const newValueTrimmed = newValue.replace(/\s/g, '')
  if (newValueTrimmed === '') return null
  if (isNaN(newValueTrimmed) || newValueTrimmed.indexOf('.') !== -1) return currentValue
  return Math.round(Number(newValueTrimmed))
}
