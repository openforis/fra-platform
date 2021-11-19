import * as R from 'ramda'

import { Numbers } from '@core/utils/numbers'

import * as ExtentOfForestState from '@webapp/sectionSpec/fra/extentOfForest/extentOfForestState'
import * as ForestCharacteristicsState from '@webapp/sectionSpec/fra/forestCharacteristics/forestCharacteristicsState'

// ==== Datum validator functions

export const plantationForestValidator = (datum: any) => () => {
  const plantationForest: any = ForestCharacteristicsState.getPlantationForest(datum)()
  const plantationForestIntroduced: any = ForestCharacteristicsState.getPlantationForestIntroduced(datum)()

  if (R.isNil(plantationForest) || R.isNil(plantationForestIntroduced)) {
    return true
  }

  const tolerance = -1
  const difference = Numbers.sub(plantationForest, plantationForestIntroduced)
  return Numbers.greaterThan(difference, tolerance)
}

export const totalForestAreaNotEqualToExtentOfForestValidator = (datum: any) => (state: any) => {
  const { name: year } = datum
  const forest = ExtentOfForestState.getForestByYear(year)(state)
  const totalForest = ForestCharacteristicsState.getTotalForest(datum)()

  if (R.isNil(forest) || R.isNil(totalForest)) {
    return true
  }

  const tolerance = 1
  const absDifference = Numbers.abs(Numbers.sub(forest, totalForest))
  return !Numbers.greaterThanOrEqualTo(absDifference, tolerance)
}

//= === Validation messages

export const getValidationMessages = (data: any) => (state: any) =>
  data.map((datum: any) => {
    const messages = []

    if (!plantationForestValidator(datum)()) {
      messages.push({ key: 'generalValidation.subCategoryExceedsParent' })
    }

    if (!totalForestAreaNotEqualToExtentOfForestValidator(datum)(state)) {
      messages.push({ key: 'generalValidation.forestAreaDoesNotMatchExtentOfForest' })
    }

    return messages
  })
