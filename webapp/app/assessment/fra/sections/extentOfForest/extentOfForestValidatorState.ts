// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

// ==== Datum validator functions

const forestAreaComparedTo2015Validator = (datum: any) => (state: any) => {
  const { name: year, forestArea } = datum
  const forestArea2015 = ExtentOfForestState.getForestArea2015Value(year)(state)

  if (R.isNil(forestArea2015) || R.isNil(forestArea)) {
    return true
  }

  const tolerance = 1
  const absDifference = NumberUtils.abs(NumberUtils.sub(forestArea2015, forestArea))
  return NumberUtils.lessThanOrEqualTo(absDifference, tolerance)
}

export const areasNotExceedingTotalLandAreaValidator = (datum: any) => (state: any) => {
  const otherLand = ExtentOfForestState.getOtherLand(datum)(state)
  const faoStatArea = ExtentOfForestState.getFaoStatArea(datum)(state)

  if (R.isNil(faoStatArea) || R.isNil(otherLand)) {
    return true
  }
  return NumberUtils.greaterThanOrEqualTo(otherLand, 0)
}

export const forestAreaValidator = (datum: any) => (state: any) => {
  const { type } = datum
  const forestArea = ExtentOfForestState.getForest(datum)()

  const comparedTo2015Area = forestAreaComparedTo2015Validator(datum)(state)
  const areasNotExceedingTotalLandArea = areasNotExceedingTotalLandAreaValidator(datum)(state)
  const hasValue = type === 'odp' ? !R.isNil(forestArea) : true

  return comparedTo2015Area && areasNotExceedingTotalLandArea && hasValue
}

export const otherWoodedLandValidator = (datum: any) => (state: any) => {
  const { otherWoodedLand, type } = datum

  const areasNotExceedingTotalLandArea = areasNotExceedingTotalLandAreaValidator(datum)(state)
  const hasValue = type === 'odp' ? !R.isNil(otherWoodedLand) : true

  return areasNotExceedingTotalLandArea && hasValue
}

// ==== Common validator

export const lessThanOrEqualToForestValidator = (year: any, value: any) => (state: any) => {
  const forest = ExtentOfForestState.getForestByYear(year)(state)

  if (R.isNil(value) || R.isNil(forest)) {
    return true
  }
  return NumberUtils.greaterThanWithTolerance(forest, value)
}

// ==== Validation messages

export const getValidationMessages = (data: any) => (state: any) =>
  data.map((datum: any) => {
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
