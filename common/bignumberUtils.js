const BigNumber = require('bignumber.js')
const R = require('ramda')

//disabling BigNumber Error: new BigNumber() number type has more than 15 significant digits
BigNumber.config({ERRORS: false})

const sum = array => R.isEmpty(array)
  ? null
  : R.reduce((total, f) => add(total, f), 0, array)

const add = (x, y) => new BigNumber(x).add(new BigNumber(y)).toFixed(2)

const mul = (x, y) => new BigNumber(x).mul(new BigNumber(y)).toFixed(2)

const div = (x, y) => new BigNumber(x).div(new BigNumber(y)).toFixed(2)

const toFixed = (value, precision = 2) => value
  ? new BigNumber(value).toFixed(precision)
  : null

module.exports.sum = sum
// module.exports.add = add
module.exports.mul = mul
module.exports.div = div
module.exports.toFixed = toFixed
