/*
 * Module for validators which are reusable in multiple traditional tables (tableSpecs)
 * Don't put your verySpecificValidatorUsedInOnePlace here, leave it in tableSpec instead
 */
import R from 'ramda'
import { sub, abs, lessThan, greaterThan } from '../../common/bignumberUtils'
import { totalSum } from '../traditionalTable/aggregate'
import { getForestAreaForYear } from '../assessmentFra/extentOfForest/extentOfForestHelper'
import { formatDecimal } from '../utils/numberFormat'

export const subCategoryValidator =
  (totalRowIndex, rowIndexes) => (props, currentFieldRowIdx, currentFieldColumnIdx) => {
  const totalValue = props.tableData[totalRowIndex][currentFieldColumnIdx]
  const sumOfParts = totalSum(props.tableData, currentFieldColumnIdx, rowIndexes)
  const value = props.tableData[currentFieldRowIdx][currentFieldColumnIdx]
  if (R.isNil(value) || R.isNil(sumOfParts) || R.isNil(totalValue)) return {valid: true}
  const tolerance = -1
  const difference = sub(totalValue, sumOfParts)
  const valid = greaterThan(difference, tolerance)
  return {
    valid: valid,
    message: valid
      ? null
      : props.i18n.t('generalValidation.subCategoryExceedsParent')
  }
}

export const forestAreaSameAsExtentOfForestValidator =
  (year, extentOfForest, rowIndexes) => (props, _, colIdx) => {
    const eofForestArea = getForestAreaForYear(extentOfForest, year)
    const forestArea = totalSum(props.tableData, colIdx, rowIndexes)
    if (!eofForestArea || !forestArea) return {valid: true}
    const tolerance = 1
    const absDifference = abs(sub(eofForestArea, forestArea))
    const result = lessThan(absDifference, tolerance)
    return {
      valid: result,
      message: result
        ? null
        : props.i18n.t('generalValidation.forestAreaDoesNotMatchExtentOfForest')
    }
  }

  export const forestAreaLessThanOrEqualToExtentOfForestValidator =
    (year, extentOfForest, rowIndexes) => (props, row, column) => {
    const eofForestArea = getForestAreaForYear(extentOfForest, year)
    const forestAreaValue = rowIndexes
      ? totalSum(props.tableData, column, rowIndexes)
      : props.tableData[row][column]
    if (!eofForestArea || !forestAreaValue) return {valid: true}
    const tolerance = -1
    const difference = sub(eofForestArea, forestAreaValue)
    const result = greaterThan(difference, tolerance)
    return {
      valid: result,
      message: result
        ? null
        : props.i18n.t('generalValidation.forestAreaExceedsExtentOfForest')
    }
  }
