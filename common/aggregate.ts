import * as R from 'ramda'
import { sum } from './bignumberUtils'
import { formatDecimal } from './numberFormat'

/**
 * @deprecated - use FRAUtils.sumTableColumn
 */
export const totalSum = (tableData: any, columnIndex: any, rowIndexes: any) =>
  R.pipe(
    R.map((r: any) => tableData[r][columnIndex]),
    R.reject((v: any) => !v),
    sum
  )(rowIndexes)

/**
 * @deprecated
 */
export const totalSumFormatted = (tableData: any, columnIndex: any, rowIndexes: any, formatFunction = formatDecimal) =>
  formatFunction(totalSum(tableData, columnIndex, rowIndexes))

export default {
  totalSum,
  totalSumFormatted,
}
