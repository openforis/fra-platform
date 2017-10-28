/*
 * Module for validators which are reusable in multiple traditional tables (tableSpecs)
 * Don't put your verySpecificValidatorUsedInOnePlace here, leave it in tableSpec instead
 */
import R from 'ramda'
import BigNumber from 'bignumber.js'
import { eq } from '../../common/bignumberUtils'
import { totalSum } from '../traditionalTable/aggregate'
import { getForestAreaForYear } from '../extentOfForest/extentOfForestHelper'
import { formatDecimal } from '../utils/numberFormat'

export const subCategoryValidator =
  (totalRowIndex, rowIndexes) => (props, currentFieldRowIdx, currentFieldColumnIdx) => {
  const totalValue = props.tableData[totalRowIndex][currentFieldColumnIdx]
  const sumOfParts = totalSum(props.tableData, currentFieldColumnIdx, rowIndexes)
  const value = props.tableData[currentFieldRowIdx][currentFieldColumnIdx]
  if (R.isNil(value) || R.isNil(sumOfParts) || R.isNil(totalValue)) return {valid: true}
  const valid = BigNumber(totalValue).greaterThanOrEqualTo(BigNumber(sumOfParts))
  return {
    valid: valid,
    message: valid ? null : props.i18n.t('generalValidation.subCategoryExceedsParent')
  }
}

export const forestAreaSameAsExtentOfForestValidator =
  (year, extentOfForest, rowIndexes) => (props, _, colIdx) => {
    const eofForestArea = getForestAreaForYear(extentOfForest, year)
    const forestArea = totalSum(props.tableData, colIdx, rowIndexes)
    if (!eofForestArea || !forestArea) return {valid: true}
    const result = eq(eofForestArea, forestArea)
    return {
      valid: result,
      message: result
        ? null
        : props.i18n.t('generalValidation.forestAreaDoesNotMatchExtentOfForest', {eofForestArea: formatDecimal(eofForestArea)})
    }

  }
