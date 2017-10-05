import R from 'ramda'
import { sum } from '../../common/bignumberUtils'
import { formatDecimal } from '../utils/numberFormat'

export const totalSum = (tableData, columnIndex, rowIndexes, formatFunction = formatDecimal) =>
  R.pipe(
    R.map(r => tableData[r][columnIndex]),
    R.reject(v => !v),
    sum,
    formatFunction
  )(rowIndexes)
