const { formatNumber } = require('./bignumberUtils')

const formatInteger = num => formatNumber(num, 0)

const formatDecimal = num => formatNumber(num, 2)

module.exports = {
  formatDecimal,
  formatInteger,
}
