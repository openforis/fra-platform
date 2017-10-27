/*
 * Module for validators which are reusable in multiple traditional tables (tableSpecs)
 * Don't put your verySpecificValidatorUsedInOnePlace here, leave it in tableSpec instead
 */
import R from 'ramda'
import BigNumber from 'bignumber.js'
import { totalSum } from '../traditionalTable/aggregate'

export const ofWhichValidator =
  (totalRowIndex, rowIndexes) => (tableData, currentFieldRowIdx, currentFieldColumnIdx) => {
    const totalVAlue = tableData[totalRowIndex][currentFieldColumnIdx]
    const sumOfParts = totalSum(tableData, currentFieldColumnIdx, rowIndexes)
    const value = tableData[currentFieldRowIdx][currentFieldColumnIdx]
    if (R.isNil(value) || R.isNil(sumOfParts) || R.isNil(totalVAlue)) return true
    return BigNumber(totalVAlue).greaterThanOrEqualTo(BigNumber(sumOfParts))
  }

export const subCategoryValidator =
  (totalRowIndex, rowIndexes) => (props, currentFieldRowIdx, currentFieldColumnIdx) => {
  const totalVAlue = props.tableData[totalRowIndex][currentFieldColumnIdx]
  const sumOfParts = totalSum(props.tableData, currentFieldColumnIdx, rowIndexes)
  const value = props.tableData[currentFieldRowIdx][currentFieldColumnIdx]
  if (R.isNil(value) || R.isNil(sumOfParts) || R.isNil(totalVAlue)) return {valid: true}
  const valid = BigNumber(totalVAlue).greaterThanOrEqualTo(BigNumber(sumOfParts))
  return {
    valid: valid,
    message: valid ? null : props.i18n.t('generalValidation.subCategoryExceedsParent')
  }
}
