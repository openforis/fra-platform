
// Util function for UI fields which require integer values to be stored
// Gives previous value if new can't be converted to Integer
export const acceptNextInteger = (newValue, currentValue) => {
  if (newValue === '') return null
  if (isNaN(newValue) || newValue.indexOf('.') !== -1) return currentValue
  return Math.round(Number(newValue))
}
