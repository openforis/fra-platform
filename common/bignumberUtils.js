const BigNumber = require('bignumber.js')
const R = require('ramda')

//disabling BigNumber Error: new BigNumber() number type has more than 15 significant digits
BigNumber.config({ERRORS: false})

const toBigNumber = value => new BigNumber(value)

const sum = array => R.isEmpty(array)
  ? null
  : R.reduce((total, f) => add(total, f), 0, array).toFixed(2)

const add = (x, y) => toBigNumber(x).add(toBigNumber(y))

const sub = (x, y) => toBigNumber(x).sub(toBigNumber(y))

const mul = (x, y) => toBigNumber(x).mul(toBigNumber(y))

const div = (x, y) => toBigNumber(x).div(toBigNumber(y))

const toFixed = (value, precision = 2) => value
  ? toBigNumber(value).toFixed(precision)
  : null

module.exports.sum = sum
module.exports.add = add
module.exports.sub = sub
module.exports.mul = mul
module.exports.div = div
module.exports.toFixed = toFixed
