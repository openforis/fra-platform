import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'
import * as FraUtils from '@common/fraUtils'
import { sum } from '@common/bignumberUtils'
import { isPrintingMode } from '@webapp/app/assessment/components/print/printAssessment'

import * as CountryState from '@webapp/app/country/countryState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

const section = FRA.sections['1'].children.b

// ==== State getter functions

const _getFra = AssessmentState.getFra(FRA.type, section.name, section.tables.forestCharacteristics)

export const getForestCharacteristicsData = () =>
  R.pipe(_getFra, R.when(R.always(isPrintingMode()), FraUtils.filterFraYears))

export const isForestCharacteristicsDataEmpty = () => R.pipe(_getFra, FraUtils.isTableWithOdpEmpty)

export const hasOriginalDataPoints = state => {
  const extentOfForestHasOdps = ExtentOfForestState.hasOriginalDataPoints(state)
  const useOriginalDataPointsInFoc = !!CountryState.getConfigUseOriginalDataPointsInFoc(state)
  return extentOfForestHasOdps && useOriginalDataPointsInFoc
}

export const useDescriptions = R.pipe(_getFra, R.ifElse(R.isNil, R.F, R.pipe(FraUtils.hasOdps, R.not)))

// ==== Datum getter functions

export const getNaturalForest = datum => () => R.propOr(null, 'naturalForestArea', datum)

export const getPlantationForest = datum => () => R.propOr(null, 'plantationForestArea', datum)

export const getPlantationForestIntroduced = datum => () => R.propOr(null, 'plantationForestIntroducedArea', datum)

export const getOtherPlantedForest = datum => () => R.propOr(null, 'otherPlantedForestArea', datum)

export const getPlantedForest = datum => () => {
  const plantationForest = getPlantationForest(datum)()
  const otherPlantedForest = getOtherPlantedForest(datum)()
  return sum([plantationForest, otherPlantedForest])
}

export const getTotalForest = datum => () => {
  const naturalForest = getNaturalForest(datum)()
  const plantedForest = getPlantedForest(datum)()
  return sum([naturalForest, plantedForest])
}
