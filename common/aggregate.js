const R = require('ramda')
const { sum } = require('./bignumberUtils')
const { formatDecimal } = require('./numberFormat')

const totalSum = (tableData, columnIndex, rowIndexes) =>
  R.pipe(
    R.map(r => tableData[r][columnIndex]),
    R.reject(v => !v),
    sum
  )(rowIndexes)

const totalSumFormatted = (tableData, columnIndex, rowIndexes, formatFunction = formatDecimal) =>
  formatFunction(totalSum(tableData, columnIndex, rowIndexes))

module.exports = {
  totalSum,
  totalSumFormatted
}
