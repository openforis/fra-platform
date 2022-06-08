import { Numbers } from '@core/utils/numbers'
import * as ExtentOfForestState from '@webapp/sectionSpec/fra/extentOfForest/extentOfForestState'
import * as R from 'ramda'

// ==== Datum validator functions

// isValidForestAreaComparedTo2015(extentOfForest.forestArea['2015'], extentOfForest.forestArea)
const forestAreaComparedTo2015Validator = (datum: any) => (state: any) => {
  const { name: year, forestArea } = datum
  const forestArea2015: any = ExtentOfForestState.getForestArea2015Value(year)(state)

  if (R.isNil(forestArea2015) || R.isNil(forestArea)) {
    return true
  }

  const tolerance = 1
  const absDifference = Numbers.abs(Numbers.sub(forestArea2015, forestArea))
  return Numbers.lessThanOrEqualTo(absDifference, tolerance)
}

// isValidOtherLand(extentOfForest.otherLand, extentOfForest.totalLandArea)
export const areasNotExceedingTotalLandAreaValidator = (datum: any) => (state: any) => {
  const otherLand = ExtentOfForestState.getOtherLand(datum)(state)
  const faoStatArea = ExtentOfForestState.getFaoStatArea(datum)(state)

  if (R.isNil(faoStatArea) || R.isNil(otherLand)) {
    return true
  }
  return Numbers.greaterThanOrEqualTo(otherLand, 0)
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
  return Numbers.greaterThanWithTolerance(forest, value)
}

// ==== Validation messages

export const getValidationMessages = (data: any) => (state: any) =>
  data.map((datum: any) => {
    const { type, forestArea, name: year } = datum
    const messages = []

    if (type === 'odp' && R.isNil(forestArea)) {
      // isValidOdp(extentOfForest.forestArea)
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
