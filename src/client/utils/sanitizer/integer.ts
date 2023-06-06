import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

export const acceptableAsInteger = (newValue: string) => {
  const newValueTrimmed = newValue.trim()
  if (newValueTrimmed === '') return true
  if (newValueTrimmed.includes('e')) return false
  const number = Number(newValueTrimmed)
  return !Number.isNaN(number) && newValueTrimmed.indexOf('.') === -1 && Number.isFinite(number)
}

export const acceptNextInteger = (newValue: string, currentValue: string) => {
  if (Objects.isEmpty(newValue)) return null
  const newValueTrimmed = newValue.trim()
  if (newValueTrimmed === '') return null
  if (!acceptableAsInteger(newValue)) return currentValue
  if (newValueTrimmed.length > 20) return currentValue
  return Numbers.toFixed(Math.round(Number(newValueTrimmed)), 0)
}
