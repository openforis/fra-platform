const BigNumber = require('bignumber.js')
const R = require('ramda')

//disabling BigNumber Error: new BigNumber() number type has more than 15 significant digits
const groupSeparator = '\xA0'
BigNumber.config({
  ERRORS: false,
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator, // non-breaking space
    groupSize: 3
  }
})

const defaultTo0 = R.defaultTo(0)

const toBigNumber = (value = '') => {
  if (value instanceof BigNumber) return value //Do not wrap unnecessarily
  return new BigNumber(
    R.is(String, value)
      ? value.split(groupSeparator).join('')
      : value
  )
}

const applyOperator = (x, y, op) => {
  const result = toBigNumber(x)[op](toBigNumber(y))
  return result.isFinite() ? result : null
}

const applyComparison = (x, y, comp) => {
  const xNum = toBigNumber(x)
  const yNum = toBigNumber(y)
  return xNum.isFinite() && yNum.isFinite() && xNum[comp](yNum)
}

const sum = array => R.isEmpty(array) || array.every(v => !v)
  ? null
  : R.reduce((total, f) => add(total, defaultTo0(f)), 0, array)

const add = (x, y) => applyOperator(x, y, 'add')

const sub = (x, y) => applyOperator(x, y, 'sub')

const mul = (x, y) => applyOperator(x, y, 'mul')

const div = (x, y) => applyOperator(x, y, 'div')

const greaterThanOrEqualTo = (x, y) => applyComparison(x, y, 'greaterThanOrEqualTo')

const lessThanOrEqualTo = (x, y) => applyComparison(x, y, 'lessThanOrEqualTo')

const greaterThan = (x, y) => applyComparison(x, y, 'greaterThan')

const lessThan = (x, y) => applyComparison(x, y, 'lessThan')

const eq = (x, y) => applyComparison(x, y, 'eq')

const abs = (x) => {
  const xNum = toBigNumber(x)
  return xNum.isFinite() ? xNum.abs() : null
}

const toFixed = (value, precision = 2) => R.isNil(value)
  ? null
  : toBigNumber(value).toFixed(precision)

const toString = (value) => R.isNil(value)
  ? null
  : toBigNumber(value).toString()

const formatNumber = (value, precision = 2) => R.isNil(value)
  ? null
  : toBigNumber(value).toFormat(precision)

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
module.exports.lessThan = lessThan
module.exports.toFixed = toFixed
module.exports.toString = toString
module.exports.formatNumber = formatNumber
module.exports.defaultTo0 = defaultTo0
