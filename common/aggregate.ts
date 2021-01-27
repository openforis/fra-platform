// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sum'.
const { sum } = require('./bignumberUtils')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'formatDeci... Remove this comment to see the full error message
const { formatDecimal } = require('./numberFormat')

/**
 * @deprecated - use FRAUtils.sumTableColumn
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'totalSum'.
const totalSum = (tableData: any, columnIndex: any, rowIndexes: any) =>
  R.pipe(
    R.map((r: any) => tableData[r][columnIndex]),
    R.reject((v: any) => !v),
    sum
  )(rowIndexes)

/**
 * @deprecated
 */
const totalSumFormatted = (tableData: any, columnIndex: any, rowIndexes: any, formatFunction = formatDecimal) =>
  formatFunction(totalSum(tableData, columnIndex, rowIndexes))

module.exports = {
  totalSum,
  totalSumFormatted,
}
