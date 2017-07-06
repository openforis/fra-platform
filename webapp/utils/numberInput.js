
const trim = (value) => value.replace(/\s/g, '')

export const acceptableAsInteger = (newValue) => {
  const newValueTrimmed = trim(newValue)
  if (newValueTrimmed === '') return true
  return !isNaN(newValueTrimmed) &&
          newValueTrimmed.indexOf('.') === -1 &&
          isFinite(newValueTrimmed)
}

// Util function for UI fields which require integer values to be stored
// Gives previous value if new can't be converted to Integer
export const acceptNextInteger = (newValue, currentValue) => {
  const newValueTrimmed = trim(newValue)
  if (newValueTrimmed === '') return null
  if (!acceptableAsInteger(newValue)) return currentValue
  if (newValueTrimmed.length > 20) return currentValue
  return Math.round(Number(newValueTrimmed))
}
