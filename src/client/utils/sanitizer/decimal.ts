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

export const acceptNextDecimal = (props: { precision?: number; value: string; valuePrev: string }) => {
  const { value, valuePrev, precision = 2 } = props
  if (Objects.isEmpty(value)) return null
  const newValueTrimmed = value.trim()
  if (newValueTrimmed === '') return null
  if (!acceptableAsDecimal(value)) return valuePrev
  if (newValueTrimmed.length > 20) return valuePrev
  return Numbers.toFixed(Number(newValueTrimmed), precision)
}
