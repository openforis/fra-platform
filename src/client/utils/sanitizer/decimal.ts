import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

export const acceptableAsDecimal = (newValue: string) => {
  const newValueTrimmed = newValue.trim()
  if (newValueTrimmed === '') return true
  if (newValueTrimmed.includes('e')) return false
  if (!/^(-)?[0-9]*(\.{1}[0-9]*)?$/.test(newValueTrimmed)) return false
  // if (!R.test(/^(-)?[0-9]*(\.{1}[0-9]*)?$/)) return false
  const number = Number(newValueTrimmed)
  return !Number.isNaN(number) && Number.isFinite(number)
}

export const acceptNextDecimal = (newValue: string, currentValue: string, precision?: number) => {
  if (Objects.isEmpty(newValue)) return null
  const newValueTrimmed = newValue.trim()
  if (newValueTrimmed === '') return null
  if (!acceptableAsDecimal(newValue)) return currentValue
  if (newValueTrimmed.length > 20) return currentValue
  return Numbers.toFixed(Number(newValueTrimmed), precision)
}
