import BigNumber from 'bignumber.js'
import * as R from 'ramda'

// disabling BigNumber Error: new BigNumber() number type has more than 15 significant digits
export const groupSeparator = '\xA0'
BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator, // non-breaking space
    groupSize: 3,
  },
})

export const defaultTo0 = R.defaultTo(0)

export type BigNumberInput = BigNumber | string | number

export const toBigNumber = (value: BigNumberInput = ''): BigNumber => {
  if (value instanceof BigNumber) return value // Do not wrap unnecessarily
  return new BigNumber(R.is(String, value) ? (value as string).split(groupSeparator).join('') : value)
}

type BigNumOp = 'plus' | 'minus' | 'times' | 'div'

export const applyOperator = (x: BigNumberInput, y: BigNumberInput, op: BigNumOp) => {
  const result = toBigNumber(x)[op](toBigNumber(y))
  return result.isFinite() ? result : null
}
type BigNumComparison = 'eq' | 'gte' | 'gt' | 'lte' | 'lt'

export const applyComparison = (x: BigNumberInput, y: BigNumberInput, comp: BigNumComparison) => {
  const xNum = toBigNumber(x)
  const yNum = toBigNumber(y)
  return xNum.isFinite() && yNum.isFinite() && xNum[comp](yNum)
}

export const sum = (array: any) =>
  R.isEmpty(array) || array.every((v: any) => !v)
    ? null
    : R.reduce((total: any, f: any) => add(total, defaultTo0(f)), 0, array)

// API has changed, updated applyOperator params
export const add = (x: BigNumberInput, y: BigNumberInput) => applyOperator(x, y, 'plus')

export const sub = (x: BigNumberInput, y: BigNumberInput) => applyOperator(x, y, 'minus')

export const mul = (x: BigNumberInput, y: BigNumberInput) => applyOperator(x, y, 'times')

export const div = (x: BigNumberInput, y: BigNumberInput) => applyOperator(x, y, 'div')

export const greaterThanOrEqualTo = (x: BigNumberInput, y: BigNumberInput) => applyComparison(x, y, 'gte')

export const lessThanOrEqualTo = (x: BigNumberInput, y: BigNumberInput) => applyComparison(x, y, 'lte')

export const greaterThan = (x: BigNumberInput, y: BigNumberInput) => applyComparison(x, y, 'gt')
export const greaterThanWithTolerance = (x: BigNumberInput, y: BigNumberInput, tolerance = -1) =>
  greaterThan(sub(x, y), tolerance)

export const lessThan = (x: BigNumberInput, y: BigNumberInput) => applyComparison(x, y, 'lt')

export const eq = (x: BigNumberInput, y: BigNumberInput) => applyComparison(x, y, 'eq')

export const abs = (x: any) => {
  const xNum = toBigNumber(x)
  return xNum.isFinite() ? xNum.abs() : null
}

export const toFixed = (value: any, precision = 2): string | null =>
  R.isNil(value) ? null : toBigNumber(value).toFixed(precision)

export const toString = (value: any) => (R.isNil(value) ? null : toBigNumber(value).toString())

export const formatNumber = (value: any, precision = 2) =>
  R.isNil(value) ? null : toBigNumber(value).toFormat(precision)

export const max = BigNumber.max
export const min = BigNumber.min
