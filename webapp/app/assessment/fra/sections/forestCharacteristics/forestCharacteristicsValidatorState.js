import * as R from 'ramda'

import { abs, greaterThan, greaterThanOrEqualTo, sub } from '@common/bignumberUtils'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as ForestCharacteristicsState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsState'

// ==== Datum validator functions

export const plantationForestValidator = (datum) => () => {
  const plantationForest = ForestCharacteristicsState.getPlantationForest(datum)()
  const plantationForestIntroduced = ForestCharacteristicsState.getPlantationForestIntroduced(datum)()

  if (R.isNil(plantationForest) || R.isNil(plantationForestIntroduced)) {
    return true
  }

  const tolerance = -1
  const difference = sub(plantationForest, plantationForestIntroduced)
  return greaterThan(difference, tolerance)
}

export const totalForestAreaNotEqualToExtentOfForestValidator = (datum) => (state) => {
  const { name: year } = datum
  const forest = ExtentOfForestState.getForestByYear(year)(state)
  const totalForest = ForestCharacteristicsState.getTotalForest(datum)()

  if (R.isNil(forest) || R.isNil(totalForest)) {
    return true
  }

  const tolerance = 1
  const absDifference = abs(sub(forest, totalForest))
  return !greaterThanOrEqualTo(absDifference, tolerance)
}

//= === Validation messages

export const getValidationMessages = (data) => (state) =>
  data.map((datum) => {
    const messages = []

    if (!plantationForestValidator(datum)()) {
      messages.push({ key: 'generalValidation.subCategoryExceedsParent' })
    }

    if (!totalForestAreaNotEqualToExtentOfForestValidator(datum)(state)) {
      messages.push({ key: 'generalValidation.forestAreaDoesNotMatchExtentOfForest' })
    }

    return messages
  })
