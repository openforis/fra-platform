import * as R from 'ramda'
import { abs, greaterThanOrEqualTo, lessThanOrEqualTo, sub, sum } from '@common/bignumberUtils'

import * as CountryState from '@webapp/app/country/countryState'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

const getForestArea2015Value = year => R.pipe(
  CountryState.getConfigFra2015ForestAreas,
  R.prop(year),
)

const forestAreaComparedTo2015Validator = datum => state => {
  const { name: year, forestArea } = datum
  const forestArea2015 = getForestArea2015Value(year)(state)

  if (R.isNil(forestArea2015) || R.isNil(forestArea)) {
    return true
  }

  const tolerance = 1
  const absDifference = abs(sub(forestArea2015, forestArea))
  return lessThanOrEqualTo(absDifference, tolerance)
}

export const areasNotExceedingTotalLandAreaValidator = datum => state => {
  const { name: year } = datum
  const otherLandArea = ExtentOfForestState.getOtherLandArea(datum)(state)
  const faoStatLandArea = ExtentOfForestState.getFaoStatArea(year)(state)

  if (R.isNil(faoStatLandArea) || R.isNil(otherLandArea)) {
    return true
  }
  return greaterThanOrEqualTo(otherLandArea, 0)
}

//==== a
export const forestAreaValidator = datum => state => {
  const { forestArea, type } = datum

  const comparedTo2015Area = forestAreaComparedTo2015Validator(datum)(state)
  const areasNotExceedingTotalLandArea = areasNotExceedingTotalLandAreaValidator(datum)(state)
  const hasValue = type === 'odp' ? !R.isNil(forestArea) : true

  return comparedTo2015Area && areasNotExceedingTotalLandArea && hasValue
}

//==== b
export const otherWoodedLandValidator = datum => state => {
  const { otherWoodedLand, type } = datum

  const areasNotExceedingTotalLandArea = areasNotExceedingTotalLandAreaValidator(datum)(state)
  const hasValue = type === 'odp' ? !R.isNil(otherWoodedLand) : true

  return areasNotExceedingTotalLandArea && hasValue
}
