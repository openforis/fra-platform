import * as R from 'ramda'

import { abs, greaterThan, greaterThanOrEqualTo, sub } from '@common/bignumberUtils'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as ForestCharacteristicsState
  from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsState'

// ==== Datum validator functions

export const plantationForestValidator = datum => () => {
  const { plantationForestArea, plantationForestIntroducedArea } = datum

  if (R.isNil(plantationForestArea) || R.isNil(plantationForestIntroducedArea)) {
    return true
  }

  const tolerance = -1
  const difference = sub(plantationForestArea, plantationForestIntroducedArea)
  return greaterThan(difference, tolerance)
}

export const totalForestAreaNotEqualToExtentOfForestValidator = datum => state => {
  const { name: year } = datum

  const forestArea = ExtentOfForestState.getForestAreaByYear(year)(state)
  const totalForestArea = ForestCharacteristicsState.getTotalForestAreaByYear(year)(state)

  if (R.isNil(forestArea) || R.isNil(totalForestArea)) {
    return true
  }

  const tolerance = 1
  const absDifference = abs(sub(forestArea, totalForestArea))
  return !greaterThanOrEqualTo(absDifference, tolerance)
}

//==== Validation messages
export const getValidationMessages = data => state =>
  data.map(datum => {
    const messages = []

    if (!plantationForestValidator(datum)(state)) {
      messages.push({ key: 'generalValidation.subCategoryExceedsParent' })
    }

    if (!totalForestAreaNotEqualToExtentOfForestValidator(datum)(state)) {
      messages.push({ key: 'generalValidation.forestAreaDoesNotMatchExtentOfForest' })
    }

    return messages
  })
