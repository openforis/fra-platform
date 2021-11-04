import * as R from 'ramda'
import { toFixed } from '@core/utils/numbers'

const trim = (value: any) => value.replace(/\s|\,/g, '')

export const acceptableAsInteger = (newValue: any) => {
  const newValueTrimmed = trim(newValue)
  if (newValueTrimmed === '') return true
  if (R.contains('e', newValueTrimmed)) return false
  return !isNaN(newValueTrimmed) && newValueTrimmed.indexOf('.') === -1 && isFinite(newValueTrimmed)
}

// Util function for UI fields which require integer values to be stored
// Gives previous value if new can't be converted to Integer
export const acceptNextInteger = (newValue: any, currentValue: any) => {
  if (R.isNil(newValue)) return null
  const newValueTrimmed = trim(newValue)
  if (newValueTrimmed === '') return null
  if (!acceptableAsInteger(newValue)) return currentValue
  if (newValueTrimmed.length > 20) return currentValue
  return Math.round(Number(newValueTrimmed))
}

const isValidDecimalPart = (d: any, checkNoDecimals: any) => {
  if (checkNoDecimals) {
    const ds = d.split('.')
    return ds.length === 2 ? ds[1].length <= 2 : true
  }
  return true
}

export const acceptableAsDecimal = (newValue: any, checkNoDecimals = true) => {
  const newValueTrimmed = trim(newValue)
  if (newValueTrimmed === '') return true
  if (R.contains('e', newValueTrimmed)) return false
  if (!R.test(/^(-)?[0-9]*(\.{1}[0-9]*)?$/)) return false
  return !isNaN(newValueTrimmed) && isValidDecimalPart(newValueTrimmed, checkNoDecimals) && isFinite(newValueTrimmed)
}

// Util function for UI fields which require integer values to be stored
// Gives previous value if new can't be converted to Integer
export const acceptNextDecimal = (newValue: any, currentValue: any) => {
  if (R.isNil(newValue)) return null
  const newValueTrimmed = trim(newValue)
  if (newValueTrimmed === '') return null
  if (!acceptableAsDecimal(newValue, false)) return currentValue
  if (newValueTrimmed.length > 20) return currentValue
  return toFixed(newValueTrimmed)
}
