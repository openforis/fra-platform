/*
 * Module for validators which are reusable in multiple traditional tables (tableSpecs)
 * Don't put your verySpecificValidatorUsedInOnePlace here, leave it in tableSpec instead
 */
import * as R from 'ramda'
import { abs, greaterThan, greaterThanOrEqualTo, lessThan, sub, eq } from '@common/bignumberUtils'
import { totalSum } from '@common/aggregate'
import { getForestAreaForYear, getOtherLandAreaForYear } from '@common/extentOfForestHelper'
import { getTotalGrowingStockInForest } from '@webapp/app/assessment/fra/sections/growingStock/growingStock'

export const subCategoryValidator = (totalRowIndex, rowIndexes) =>
  (props, currentFieldRowIdx, currentFieldColumnIdx) => {
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

export const forestAreaSameAsExtentOfForestValidator = (year, extentOfForest, rowIndexes) =>
  (props, _, colIdx) => {
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

export const forestAreaLessThanOrEqualToExtentOfForestValidator = (year, extentOfForest, rowIndexes) =>
  (props, row, column) => {
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

export const otherLandLessThanOrEqualToExtentOfForestValidator = (year, extentOfForest, faoStat, rowIndexes) =>
  (props, row, column) => {
    const faoStatOtherLandArea = getOtherLandAreaForYear(extentOfForest, faoStat, year)
    const calculatedOtherLandAreaValue = totalSum(props.tableData, column, rowIndexes)
    if (!faoStatOtherLandArea || !calculatedOtherLandAreaValue) return {valid: true}
    const tolerance = -1
    const difference = sub(faoStatOtherLandArea, calculatedOtherLandAreaValue)
    const result = greaterThan(difference, tolerance)
    return {
      valid: result,
      message: result
        ? null
        : props.i18n.t('generalValidation.otherLandExceedsExtentOfForest')
    }
  }

export const positiveOrZero = () =>
  (props, row, column) => {
    const {i18n, tableData, calculateValue = null} = props
    const value = R.isNil(calculateValue) ? tableData[row][column] : calculateValue(props)
    const valid = R.isNil(value) || greaterThanOrEqualTo(value, 0)

    return {
      valid,
      message: valid
        ? null
        : i18n.t('generalValidation.valueMustBePositive')
    }
  }

export const equalToTotalGrowingStock = (year, growingStock, aggregateFunction = null) =>
  (props, row, column) => {
    const {i18n, tableData} = props
    const value = R.isNil(aggregateFunction) ? tableData[row][column] : aggregateFunction(tableData, column)
    const totalGrowingStock = getTotalGrowingStockInForest(growingStock, year)

    const tolerance = 1
    const difference = sub(totalGrowingStock, value)
    const result = !greaterThan(abs(difference), tolerance)

    const valid = R.isNil(value) || eq(totalGrowingStock, 0) || result

    return {
      valid,
      message: valid
        ? null
        : i18n.t('generalValidation.mustBeEqualToTotalGrowingStock')
    }
  }
