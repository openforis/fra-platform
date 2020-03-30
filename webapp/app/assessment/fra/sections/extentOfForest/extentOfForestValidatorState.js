import * as R from 'ramda'
import * as NumberUtils from '@common/bignumberUtils'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

// ==== Datum validator functions

const forestAreaComparedTo2015Validator = datum => state => {
  const { name: year, forestArea } = datum
  const forestArea2015 = ExtentOfForestState.getForestArea2015Value(year)(state)

  if (R.isNil(forestArea2015) || R.isNil(forestArea)) {
    return true
  }

  const tolerance = 1
  const absDifference = NumberUtils.abs(NumberUtils.sub(forestArea2015, forestArea))
  return NumberUtils.lessThanOrEqualTo(absDifference, tolerance)
}

export const areasNotExceedingTotalLandAreaValidator = datum => state => {
  const otherLand = ExtentOfForestState.getOtherLand(datum)(state)
  const faoStatArea = ExtentOfForestState.getFaoStatArea(datum)(state)

  if (R.isNil(faoStatArea) || R.isNil(otherLand)) {
    return true
  }
  return NumberUtils.greaterThanOrEqualTo(otherLand, 0)
}

export const forestAreaValidator = datum => state => {
  const { type } = datum
  const forestArea = ExtentOfForestState.getForest(datum)()

  const comparedTo2015Area = forestAreaComparedTo2015Validator(datum)(state)
  const areasNotExceedingTotalLandArea = areasNotExceedingTotalLandAreaValidator(datum)(state)
  const hasValue = type === 'odp' ? !R.isNil(forestArea) : true

  return comparedTo2015Area && areasNotExceedingTotalLandArea && hasValue
}

export const otherWoodedLandValidator = datum => state => {
  const { otherWoodedLand, type } = datum

  const areasNotExceedingTotalLandArea = areasNotExceedingTotalLandAreaValidator(datum)(state)
  const hasValue = type === 'odp' ? !R.isNil(otherWoodedLand) : true

  return areasNotExceedingTotalLandArea && hasValue
}

// ==== Common validator

export const lessThanOrEqualToForestValidator = (year, value) => state => {
  const forest = ExtentOfForestState.getForestByYear(year)(state)

  if (R.isNil(value) || R.isNil(forest)) {
    return true
  }
  const tolerance = -1
  const difference = NumberUtils.sub(forest, value)
  return NumberUtils.greaterThan(difference, tolerance)
}

// ==== Validation messages

export const getValidationMessages = data => state =>
  data.map(datum => {
    const { type, forestArea, name: year } = datum
    const messages = []

    if (type === 'odp' && R.isNil(forestArea)) {
      messages.push({ key: 'extentOfForest.ndpMissingValues' })
    }

    if (!forestAreaComparedTo2015Validator(datum)(state)) {
      messages.push({
        key: 'extentOfForest.forestAreaDoesNotMatchPreviouslyReported',
        params: { previous: ExtentOfForestState.getForestArea2015Value(year)(state) },
      })
    }

    if (!areasNotExceedingTotalLandAreaValidator(datum)(state)) {
      messages.push({ key: 'extentOfForest.fedAreasExceedTotalLandArea' })
    }

    return messages
  })
