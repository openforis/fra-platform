import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

export const acceptableAsInteger = (newValue: string) => {
  const newValueTrimmed = newValue.trim()
  if (newValueTrimmed === '') return true
  if (newValueTrimmed.includes('e')) return false
  const number = Number(newValueTrimmed)
  return !Number.isNaN(number) && newValueTrimmed.indexOf('.') === -1 && Number.isFinite(number)
}

export const acceptNextInteger = (props: { value: string; valuePrev: string }) => {
  const { value, valuePrev } = props
  if (Objects.isEmpty(value)) return null
  const newValueTrimmed = value.trim()
  if (newValueTrimmed === '') return null
  if (!acceptableAsInteger(value)) return valuePrev
  if (newValueTrimmed.length > 20) return valuePrev
  return Numbers.toFixed(Math.round(Number(newValueTrimmed)), 0)
}
