/*
 * Module for validators which are reusable in multiple traditional tables (tableSpecs)
 * Don't put your verySpecificValidatorUsedInOnePlace here, leave it in tableSpec instead
 */
import R from 'ramda'
import BigNumber from 'bignumber.js'
import { totalSum } from '../traditionalTable/aggregate'

export const ofWhichValidator =
  (totalRowIndex, rowIndexes) => (tableData, currentFieldRowIdx, currentFieldColumnIdx) => {
    const privateOwnerShipValue = tableData[totalRowIndex][currentFieldColumnIdx]
    const sumOfParts = totalSum(tableData, currentFieldColumnIdx, rowIndexes)
    const value = tableData[currentFieldRowIdx][currentFieldColumnIdx]
    if (R.isNil(value) || R.isNil(sumOfParts) || R.isNil(privateOwnerShipValue)) return true
    return BigNumber(privateOwnerShipValue).greaterThanOrEqualTo(BigNumber(sumOfParts))
  }
