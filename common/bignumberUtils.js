const BigNumber = require('bignumber.js')
const R = require('ramda')

//disabling BigNumber Error: new BigNumber() number type has more than 15 significant digits
BigNumber.config({
  ERRORS: false,
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: ' ',
    groupSize: 3
  }
})

const defaultTo0 = R.defaultTo(0)

const toBigNumber = value => {
  if (value instanceof BigNumber) return value //Do not wrap unnecessarily
  return new BigNumber(value)
}

const applyOp = (x, y, op) => {
  const res = toBigNumber(x)[op](toBigNumber(y))
  return res.isFinite() ? res : null
}

const sum = array => R.isEmpty(array) || array.every(v => !v)
  ? null
  : R.reduce((total, f) => add(total, defaultTo0(f)), 0, array)

const add = (x, y) => applyOp(x, y, 'add')

const sub = (x, y) => applyOp(x, y, 'sub')

const mul = (x, y) => applyOp(x, y, 'mul')

const div = (x, y) => applyOp(x, y, 'div')

const greaterThanOrEqualTo = (x, y) => {
  const xNum = toBigNumber(x)
  const yNum = toBigNumber(y)
  return xNum.isFinite() && yNum.isFinite() && xNum.greaterThanOrEqualTo(yNum)
}

const eq = (x, y) => {
  const xNum = toBigNumber(x)
  const yNum = toBigNumber(y)
  return xNum.isFinite() && yNum.isFinite() && xNum.eq(yNum)
}

const toFixed = (value, precision = 2) => R.isNil(value)
  ? null
  : toBigNumber(value).toFixed(precision)

const formatNumber = (value, precision = 2) => R.isNil(value)
  ? null
  : toBigNumber(value).toFormat(precision)

module.exports.sum = sum
module.exports.add = add
module.exports.sub = sub
module.exports.mul = mul
module.exports.div = div
module.exports.eq = eq
module.exports.greaterThanOrEqualTo = greaterThanOrEqualTo
module.exports.toFixed = toFixed
module.exports.formatNumber = formatNumber
