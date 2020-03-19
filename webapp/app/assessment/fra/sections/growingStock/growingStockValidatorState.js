import * as R from 'ramda'

import { abs, add, eq, greaterThan, sub } from '@common/bignumberUtils'

import * as GrowingStockState from '@webapp/app/assessment/fra/sections/growingStock/growingStockState'

export const equalToTotalGrowingStockValidator = (year, value) => state => {
  const totalForest = GrowingStockState.getTotalTableValue(year, GrowingStockState.variables.forest)(state)

  const tolerance = 1
  const difference = sub(totalForest, value)
  const result = !greaterThan(abs(difference), tolerance)

  return R.isNil(value) || eq(totalForest, 0) || result
}

const subCategoryValidator = (parentVariable, childVariables) => datum => state => {
  const { year } = datum
  const parentValue = GrowingStockState.getTotalTableValue(year, parentVariable)(state)
  const childValues = childVariables.reduce((childValuesTotal, childVariable) => {
    const childValue = R.pipe(GrowingStockState.getTotalTableValue(year, childVariable), R.defaultTo(0))(state)
    return add(childValuesTotal, childValue)
  }, 0)

  const tolerance = -1
  const difference = sub(parentValue, childValues)
  return parentValue ? greaterThan(difference, tolerance) : true
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

const totalForestSubCategoryValidator = subCategoryValidator(GrowingStockState.variables.forest, [
  GrowingStockState.variables.plantedForest,
  GrowingStockState.variables.naturallyRegeneratingForest,
])

export const totalForestValidator = datum => state =>
  totalForestSubCategoryValidator(datum)(state) && equalToTotalGrowingStockSubCategoryValidator(datum)(state)

export const totalPlantedForestValidator = subCategoryValidator(GrowingStockState.variables.plantedForest, [
  GrowingStockState.variables.plantationForest,
  GrowingStockState.variables.otherPlantedForest,
])

// ==== Validation messages

export const getValidationMessages = data => state =>
  data.map(datum => {
    const messages = []

    if (!equalToTotalGrowingStockSubCategoryValidator(datum)(state)) {
      messages.push({ key: 'generalValidation.mustBeEqualToTotalGrowingStock' })
    }

    if (!totalForestSubCategoryValidator(datum)(state) || !totalPlantedForestValidator(datum)(state)) {
      messages.push({ key: 'generalValidation.subCategoryExceedsParent' })
    }

    return messages
  })
