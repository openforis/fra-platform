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
const _getFraNoOdps = AssessmentState.getFraNoNDPs(FRA.type, section.name, section.tables.forestCharacteristics)

export const isForestCharacteristicsDataEmpty = () => R.pipe(_getFra, FraUtils.isTableWithOdpEmpty)

export const hasOriginalDataPoints = state => {
  const extentOfForestHasOdps = ExtentOfForestState.hasOriginalDataPoints(state)
  const useOriginalDataPointsInFoc = !!CountryState.getConfigUseOriginalDataPointsInFoc(state)
  return extentOfForestHasOdps && useOriginalDataPointsInFoc
}

export const useDescriptions = R.ifElse(
  AssessmentState.isSectionDataLoaded(FRA.type, section.name, section.tables.forestCharacteristics),
  R.pipe(hasOriginalDataPoints, R.not),
  R.always(false)
)

export const getForestCharacteristicsData = () =>
  R.pipe(
    R.ifElse(hasOriginalDataPoints, _getFra, _getFraNoOdps),
    R.when(R.always(isPrintingMode()), FraUtils.filterFraYears)
  )

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
