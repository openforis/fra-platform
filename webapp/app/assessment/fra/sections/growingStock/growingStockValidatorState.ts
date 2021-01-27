// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { abs, add, eq, greaterThan, sub } from '@common/bignumberUtils'

import * as GrowingStockState from '@webapp/app/assessment/fra/sections/growingStock/growingStockState'

export const equalToTotalGrowingStockValidator = (year: any, value: any) => (state: any) => {
  const totalForest = GrowingStockState.getTotalTableValue(year, GrowingStockState.variables.forest)(state)

  const tolerance = 1
  const difference = sub(totalForest, value)
  const result = !greaterThan(abs(difference), tolerance)

  return R.isNil(value) || eq(totalForest, 0) || result
}

const subCategoryValidator = (parentVariable: any, childVariables: any) => (datum: any) => (state: any) => {
  const { year } = datum
  const parentValue = GrowingStockState.getTotalTableValue(year, parentVariable)(state)
  const childValues = childVariables.reduce((childValuesTotal: any, childVariable: any) => {
    const childValue = R.pipe(GrowingStockState.getTotalTableValue(year, childVariable), R.defaultTo(0))(state)
    return add(childValuesTotal, childValue)
  }, 0)

  const tolerance = -1
  const difference = sub(parentValue, childValues)
  return parentValue ? greaterThan(difference, tolerance) : true
}

const equalToTotalGrowingStockSubCategoryValidator = (datum: any) => (state: any) => {
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

export const totalForestValidator = (datum: any) => (state: any) =>
  totalForestSubCategoryValidator(datum)(state) && equalToTotalGrowingStockSubCategoryValidator(datum)(state)

export const totalPlantedForestValidator = subCategoryValidator(GrowingStockState.variables.plantedForest, [
  GrowingStockState.variables.plantationForest,
  GrowingStockState.variables.otherPlantedForest,
])

// ==== Validation messages

export const getValidationMessages = (data: any) => (state: any) =>
  data.map((datum: any) => {
    const messages = []

    if (!equalToTotalGrowingStockSubCategoryValidator(datum)(state)) {
      messages.push({ key: 'generalValidation.mustBeEqualToTotalGrowingStock' })
    }

    if (!totalForestSubCategoryValidator(datum)(state) || !totalPlantedForestValidator(datum)(state)) {
      messages.push({ key: 'generalValidation.subCategoryExceedsParent' })
    }

    return messages
  })
