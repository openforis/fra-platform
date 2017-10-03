import R from 'ramda'
import { sum } from '../../common/bignumberUtils'

export const totalSum = (tableData, columnIndex, rowIndexes) =>
  R.pipe(
    R.map(r => tableData[r][columnIndex]),
    R.reject(v => !v),
    sum
  )(rowIndexes)
