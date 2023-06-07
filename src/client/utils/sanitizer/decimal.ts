import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

const isValidDecimalPart = (d: any, checkNoDecimals: any) => {
  if (checkNoDecimals) {
    const ds = d.split('.')
    return ds.length === 2 ? ds[1].length <= 2 : true
  }
  return true
}

export const acceptableAsDecimal = (newValue: string, checkNoDecimals = true) => {
  const newValueTrimmed = newValue.trim()
  if (newValueTrimmed === '') return true
  if (newValueTrimmed.includes('e')) return false
  if (!/^(-)?[0-9]*(\.{1}[0-9]*)?$/.test(newValueTrimmed)) return false
  // if (!R.test(/^(-)?[0-9]*(\.{1}[0-9]*)?$/)) return false
  const number = Number(newValueTrimmed)
  return !Number.isNaN(number) && isValidDecimalPart(newValueTrimmed, checkNoDecimals) && Number.isFinite(number)
}

export const acceptNextDecimal = (newValue: string, currentValue: string) => {
  if (Objects.isEmpty(newValue)) return null
  const newValueTrimmed = newValue.trim()
  if (newValueTrimmed === '') return null
  if (!acceptableAsDecimal(newValue, false)) return currentValue
  if (newValueTrimmed.length > 20) return currentValue
  return Numbers.toFixed(Number(newValueTrimmed))
}
