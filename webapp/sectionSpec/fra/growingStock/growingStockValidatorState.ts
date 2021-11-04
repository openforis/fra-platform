import * as R from 'ramda'

import { Numbers } from '@core/utils/numbers'

import * as GrowingStockState from '@webapp/sectionSpec/fra/growingStock/growingStockState'

export const equalToTotalGrowingStockValidator = (year: any, value: any) => (state: any) => {
  const totalForest: any = GrowingStockState.getTotalTableValue(year, GrowingStockState.variables.forest)(state)

  const tolerance = 1
  const difference = Numbers.sub(totalForest, value)
  const result = !Numbers.greaterThan(Numbers.abs(difference), tolerance)

  return R.isNil(value) || Numbers.eq(totalForest, 0) || result
}

const subCategoryValidator = (parentVariable: any, childVariables: any) => (datum: any) => (state: any) => {
  const { year } = datum
  const parentValue: any = GrowingStockState.getTotalTableValue(year, parentVariable)(state)
  const childValues: any = childVariables.reduce((childValuesTotal: any, childVariable: any) => {
    const childValue = R.pipe(GrowingStockState.getTotalTableValue(year, childVariable), R.defaultTo(0))(state)
    return Numbers.add(childValuesTotal, childValue as any)
  }, 0)

  const tolerance = -1
  const difference = Numbers.sub(parentValue, childValues)
  return parentValue ? Numbers.greaterThan(difference, tolerance) : true
}

const equalToTotalGrowingStockSubCategoryValidator = (datum: any) => (state: any) => {
  const { year } = datum

  const plantedForest: any = GrowingStockState.getTotalTableValue(
    year,
    GrowingStockState.variables.plantedForest
  )(state)
  const naturallyRegeneratingForest: any = GrowingStockState.getTotalTableValue(
    year,
    GrowingStockState.variables.naturallyRegeneratingForest
  )(state)

  if (R.isNil(plantedForest) || R.isNil(naturallyRegeneratingForest)) {
    return true
  }
  return equalToTotalGrowingStockValidator(year, Numbers.add(plantedForest, naturallyRegeneratingForest))(state)
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
