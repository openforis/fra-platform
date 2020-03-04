import * as R from 'ramda'
import { abs, greaterThan, greaterThanOrEqualTo, lessThanOrEqualTo, sub, sum } from '@common/bignumberUtils'

const totalForestAreaNotEqualToExtentOfForest = (eofForestArea, totalForestArea) => {
  if (R.isNil(eofForestArea)) return false
  if (R.isNil(totalForestArea)) return false
  const tolerance = 1
  const absDifference = abs(sub(eofForestArea, totalForestArea))
  return greaterThanOrEqualTo(absDifference, tolerance)
}

const plantationForestValidator = fraColumn => {
  const plantationForest = fraColumn.plantationForestArea
  const introduced = fraColumn.plantationForestIntroducedArea
  if (R.isNil(plantationForest) || R.isNil(introduced)) return true
  const tolerance = -1
  const difference = sub(plantationForest, introduced)
  return greaterThan(difference, tolerance)
}
