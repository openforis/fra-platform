import R from 'ramda'
import { sum } from '../../common/bignumberUtils'
import { formatDecimal } from '../utils/numberFormat'

export const totalSum = (tableData, columnIndex, rowIndexes) =>
  R.pipe(
    R.map(r => tableData[r][columnIndex]),
    R.reject(v => !v),
    sum
  )(rowIndexes)

export const totalSumFormatted = (tableData, columnIndex, rowIndexes, formatFunction = formatDecimal) =>
  formatFunction(totalSum(tableData, columnIndex, rowIndexes))
