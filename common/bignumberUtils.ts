const BigNumber = require('bignumber.js')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// disabling BigNumber Error: new BigNumber() number type has more than 15 significant digits
const groupSeparator = '\xA0'
BigNumber.config({
  ERRORS: false,
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator, // non-breaking space
    groupSize: 3,
  },
})

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'defaultTo0... Remove this comment to see the full error message
const defaultTo0 = R.defaultTo(0)

const toBigNumber = (value = '') => {
  // @ts-expect-error ts-migrate(2358) FIXME: The left-hand side of an 'instanceof' expression m... Remove this comment to see the full error message
  if (value instanceof BigNumber) return value // Do not wrap unnecessarily
  return new BigNumber(R.is(String, value) ? value.split(groupSeparator).join('') : value)
}

const applyOperator = (x: any, y: any, op: any) => {
  const result = toBigNumber(x)[op](toBigNumber(y))
  return result.isFinite() ? result : null
}

const applyComparison = (x: any, y: any, comp: any) => {
  const xNum = toBigNumber(x)
  const yNum = toBigNumber(y)
  return xNum.isFinite() && yNum.isFinite() && xNum[comp](yNum)
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sum'.
const sum = (array: any) =>
  R.isEmpty(array) || array.every((v: any) => !v)
    ? null
    : R.reduce((total: any, f: any) => add(total, defaultTo0(f)), 0, array)

// API has changed, updated applyOperator params
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'add'.
const add = (x: any, y: any) => applyOperator(x, y, 'plus')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sub'.
const sub = (x: any, y: any) => applyOperator(x, y, 'minus')

const mul = (x: any, y: any) => applyOperator(x, y, 'times')

const div = (x: any, y: any) => applyOperator(x, y, 'div')

const greaterThanOrEqualTo = (x: any, y: any) => applyComparison(x, y, 'gte')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'lessThanOr... Remove this comment to see the full error message
const lessThanOrEqualTo = (x: any, y: any) => applyComparison(x, y, 'lte')

const greaterThan = (x: any, y: any) => applyComparison(x, y, 'gt')
const greaterThanWithTolerance = (x: any, y: any, tolerance = -1) => greaterThan(sub(x, y), tolerance)

const lessThan = (x: any, y: any) => applyComparison(x, y, 'lt')

const eq = (x: any, y: any) => applyComparison(x, y, 'eq')

const abs = (x: any) => {
  const xNum = toBigNumber(x)
  return xNum.isFinite() ? xNum.abs() : null
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toFixed'.
const toFixed = (value: any, precision = 2) => (R.isNil(value) ? null : toBigNumber(value).toFixed(precision))

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toString'.
const toString = (value: any) => (R.isNil(value) ? null : toBigNumber(value).toString())

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'formatNumb... Remove this comment to see the full error message
const formatNumber = (value: any, precision = 2) => (R.isNil(value) ? null : toBigNumber(value).toFormat(precision))

module.exports.groupSeparator = groupSeparator
module.exports.sum = sum
module.exports.add = add
module.exports.sub = sub
module.exports.mul = mul
module.exports.div = div
module.exports.abs = abs
module.exports.eq = eq
module.exports.max = BigNumber.max
module.exports.min = BigNumber.min
module.exports.greaterThanOrEqualTo = greaterThanOrEqualTo
module.exports.lessThanOrEqualTo = lessThanOrEqualTo
module.exports.greaterThan = greaterThan
module.exports.greaterThanWithTolerance = greaterThanWithTolerance
module.exports.lessThan = lessThan
module.exports.toFixed = toFixed
module.exports.toString = toString
module.exports.formatNumber = formatNumber
module.exports.defaultTo0 = defaultTo0
