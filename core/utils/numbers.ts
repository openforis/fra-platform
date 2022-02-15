import BigNumber from 'bignumber.js'
import { Objects } from './objects'

const between = (value: number, min: number, max: number): boolean => min <= value && max >= value

// disabling BigNumber Error: new BigNumber() number type has more than 15 significant digits
const groupSeparator = '\xA0'
BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator, // non-breaking space
    groupSize: 3,
  },
})

const defaultTo0 = (number: BigNumber | number) => (Objects.isEmpty(number) ? 0 : number)

export type BigNumberInput = BigNumber | string | number

const toBigNumber = (value: BigNumberInput = ''): BigNumber => {
  if (value instanceof BigNumber) return value // Do not wrap unnecessarily
  return new BigNumber(typeof value === 'string' ? value.split(groupSeparator).join('') : value)
}

type BigNumOp = 'plus' | 'minus' | 'times' | 'div' | 'modulo' | 'exponentiatedBy'

const applyOperator = (x: BigNumberInput, y: BigNumberInput, op: BigNumOp): BigNumber | null => {
  const result = toBigNumber(x)[op](toBigNumber(y))
  return result.isFinite() ? result : null
}
type BigNumComparison = 'eq' | 'gte' | 'gt' | 'lte' | 'lt'

const applyComparison = (x: BigNumberInput, y: BigNumberInput, comp: BigNumComparison): boolean => {
  const xNum = toBigNumber(x)
  const yNum = toBigNumber(y)
  return xNum.isFinite() && yNum.isFinite() && xNum[comp](yNum)
}

// API has changed, updated applyOperator params
const add = (x: BigNumberInput, y: BigNumberInput): BigNumber => applyOperator(x, y, 'plus')

const sum = (array: Array<any>) =>
  Objects.isEmpty(array) || array.every((v: BigNumber) => !v)
    ? null
    : array.reduce((total: BigNumber, f) => add(total, defaultTo0(f)), toBigNumber(0))

const sub = (x: BigNumberInput, y: BigNumberInput) => applyOperator(x, y, 'minus')

const mul = (x: BigNumberInput, y: BigNumberInput) => applyOperator(x, y, 'times')

const div = (x: BigNumberInput, y: BigNumberInput) => applyOperator(x, y, 'div')

const modulo = (x: BigNumberInput, y: BigNumberInput) => applyOperator(x, y, 'modulo')

const pow = (x: BigNumberInput, y: BigNumberInput) => applyOperator(x, y, 'exponentiatedBy')

const greaterThanOrEqualTo = (x: BigNumberInput, y: BigNumberInput) => applyComparison(x, y, 'gte')

const lessThanOrEqualTo = (x: BigNumberInput, y: BigNumberInput) => applyComparison(x, y, 'lte')

const greaterThan = (x: BigNumberInput, y: BigNumberInput) => applyComparison(x, y, 'gt')
const greaterThanWithTolerance = (x: BigNumberInput, y: BigNumberInput, tolerance = -1) =>
  greaterThan(sub(x, y), tolerance)

const lessThan = (x: BigNumberInput, y: BigNumberInput) => applyComparison(x, y, 'lt')

const eq = (x: BigNumberInput, y: BigNumberInput) => applyComparison(x, y, 'eq')

const abs = (x: number | BigNumber): BigNumber | null => {
  const xNum = toBigNumber(x)
  return xNum.isFinite() ? xNum.abs() : null
}

const toFixed = (value: number | BigNumber, precision = 2): string | null =>
  Objects.isEmpty(value) ? null : toBigNumber(value).toFixed(precision)

const toString = (value: number | BigNumber): null | string =>
  Objects.isEmpty(value) ? null : toBigNumber(value).toString()

const format = (value: number | BigNumber, precision = 2): BigNumber | string =>
  Objects.isEmpty(value) ? null : toBigNumber(value).toFormat(precision)

const { max, min } = BigNumber

export const Numbers = {
  defaultTo0,
  groupSeparator,
  applyOperator,
  applyComparison,

  BigNumber,
  toBigNumber,
  // arithmetic
  add,
  sum,
  sub,
  mul,
  div,
  modulo,
  pow,

  abs,
  max,
  min,

  // logical
  greaterThan,
  lessThan,
  eq,
  between,
  lessThanOrEqualTo,
  greaterThanOrEqualTo,
  greaterThanWithTolerance,

  // utils
  format,
  toFixed,
  toString,
}
