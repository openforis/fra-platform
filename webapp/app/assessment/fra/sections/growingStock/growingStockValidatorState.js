import * as R from 'ramda'

import { abs, add, eq, greaterThan, sub } from '@common/bignumberUtils'

import * as GrowingStockState from '@webapp/app/assessment/fra/sections/growingStock/growingStockState'

const subCategoryValidator = (parentVariable, childVariables, datum) => state => {
  const { year } = datum
  const parentValue = GrowingStockState.getTotalTableValue(year, parentVariable)(state)
  const childValues = childVariables.reduce((childValuesTotal, childVariable) => {
    const childValue = R.pipe(GrowingStockState.getTotalTableValue(year, childVariable), R.defaultTo(0))(state)
    return add(childValuesTotal, childValue)
  }, 0)

  const tolerance = -1
  const difference = sub(parentValue, childValues)
  const valid = parentValue ? greaterThan(difference, tolerance) : true

  // generalValidation.subCategoryExceedsParent
  return valid
}

export const equalToTotalGrowingStockValidator = (year, value) => state => {
  const totalForest = GrowingStockState.getTotalTableValue(year, GrowingStockState.variables.forest)(state)

  const tolerance = 1
  const difference = sub(totalForest, value)
  const result = !greaterThan(abs(difference), tolerance)

  const valid = R.isNil(value) || eq(totalForest, 0) || result

  // generalValidation.mustBeEqualToTotalGrowingStock
  return valid
}

const equalToTotalGrowingStockSubCategoryValidator = datum => state => {
  const { year } = datum

  const plantedForest = GrowingStockState.getTotalTableValue(year, GrowingStockState.variables.plantedForest)(state)
  const naturallyRegeneratingForest = GrowingStockState.getTotalTableValue(
    year,
    GrowingStockState.variables.naturallyRegeneratingForest
  )(state)

  if (R.isNil(plantedForest) || R.isNil(naturallyRegeneratingForest)) {
    return true
  }
  return equalToTotalGrowingStockValidator(year, add(plantedForest, naturallyRegeneratingForest))(state)
}

export const growingStockTotalForestValidator = datum => state => {
  const forestValidator = subCategoryValidator(
    GrowingStockState.variables.forest,
    [GrowingStockState.variables.plantedForest, GrowingStockState.variables.naturallyRegeneratingForest],
    datum
  )(state)
  const equalToTotal = equalToTotalGrowingStockSubCategoryValidator(datum)(state)
  return forestValidator && equalToTotal
}
