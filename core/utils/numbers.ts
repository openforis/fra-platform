import BigNumber from 'bignumber.js'
import { Objects } from '@core/utils/objects'

const between = (value: number, min: number, max: number): boolean => min <= value && max >= value

// disabling BigNumber Error: new BigNumber() number type has more than 15 significant digits
export const groupSeparator = '\xA0'
BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator, // non-breaking space
    groupSize: 3,
  },
})

export const defaultTo0 = (number: BigNumber | number) => (Objects.isEmpty(number) ? 0 : number)

export type BigNumberInput = BigNumber | string | number

export const toBigNumber = (value: BigNumberInput = ''): BigNumber => {
  if (value instanceof BigNumber) return value // Do not wrap unnecessarily
  return new BigNumber(typeof value === 'string' ? value.split(groupSeparator).join('') : value)
}

type BigNumOp = 'plus' | 'minus' | 'times' | 'div'

export const applyOperator = (x: BigNumberInput, y: BigNumberInput, op: BigNumOp): BigNumber => {
  const result = toBigNumber(x)[op](toBigNumber(y))
  return result.isFinite() ? result : null
}
type BigNumComparison = 'eq' | 'gte' | 'gt' | 'lte' | 'lt'

export const applyComparison = (x: BigNumberInput, y: BigNumberInput, comp: BigNumComparison): boolean => {
  const xNum = toBigNumber(x)
  const yNum = toBigNumber(y)
  return xNum.isFinite() && yNum.isFinite() && xNum[comp](yNum)
}

// API has changed, updated applyOperator params
export const add = (x: BigNumberInput, y: BigNumberInput): BigNumber => applyOperator(x, y, 'plus')

export const sum = (array: Array<any>): BigNumber =>
  Objects.isEmpty(array) || array.every((v: BigNumber) => !v)
    ? null
    : array.reduce((total: BigNumber, f) => add(total, defaultTo0(f)), toBigNumber(0))

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

export const abs = (x: number | BigNumber): BigNumber | null => {
  const xNum = toBigNumber(x)
  return xNum.isFinite() ? xNum.abs() : null
}

export const toFixed = (value: any, precision = 2): string | null =>
  Objects.isEmpty(value) ? null : toBigNumber(value).toFixed(precision)

export const toString = (value: any): null | string => (Objects.isEmpty(value) ? null : toBigNumber(value).toString())

export const formatNumber = (value: any, precision = 2): BigNumber | string =>
  Objects.isEmpty(value) ? null : toBigNumber(value).toFormat(precision)

export const { max, min } = BigNumber

export const Numbers = {
  defaultTo0,
  groupSeparator,
  BigNumber,
  toBigNumber,
  applyOperator,
  applyComparison,
  add,
  sum,
  sub,
  mul,
  div,
  greaterThan,
  lessThan,
  eq,
  abs,
  toFixed,
  toString,
  formatNumber,

  max,
  min,

  between,
}
