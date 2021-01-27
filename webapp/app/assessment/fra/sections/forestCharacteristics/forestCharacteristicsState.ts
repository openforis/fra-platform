import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'
import * as FraUtils from '@common/fraUtils'
import * as NumberUtils from '@common/bignumberUtils'

import * as AppState from '@webapp/store/app/state'
import * as CountryState from '@webapp/app/country/countryState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

const section = FRA.sections['1'].children.b

export const variables = {
  naturalForestArea: 'naturalForestArea',
  plantationForestArea: 'plantationForestArea',
  plantationForestIntroducedArea: 'plantationForestIntroducedArea',
  otherPlantedForestArea: 'otherPlantedForestArea',
}

// ==== State getter functions

const _getFra = AssessmentState.getFra(FRA.type, section.name, section.tables.forestCharacteristics)
const _getFraNoOdps = AssessmentState.getFraNoNDPs(FRA.type, section.name, section.tables.forestCharacteristics)

export const isForestCharacteristicsDataEmpty = () => R.pipe(_getFra, FraUtils.isTableWithOdpEmpty)

export const hasOriginalDataPoints = (state) => {
  const extentOfForestHasOdps = ExtentOfForestState.hasOriginalDataPoints(state)
  const useOriginalDataPointsInFoc = !!CountryState.getConfigUseOriginalDataPointsInFoc(state)
  return extentOfForestHasOdps && useOriginalDataPointsInFoc
}

export const useDescriptions = R.ifElse(
  AssessmentState.isSectionDataLoaded(FRA.type, section.name, section.tables.forestCharacteristics),
  R.pipe(hasOriginalDataPoints, R.not),
  R.always(false)
)

export const getForestCharacteristicsData = () => (state) =>
  R.pipe(
    R.ifElse(hasOriginalDataPoints, _getFra, _getFraNoOdps),
    R.when(R.always(AppState.isPrintView(state)), FraUtils.filterFraYears)
  )(state)

// ==== Datum getter functions

export const getNaturalForest = (datum) => () => R.propOr(null, 'naturalForestArea', datum)

export const getPlantationForest = (datum) => () => R.propOr(null, 'plantationForestArea', datum)

export const getPlantationForestIntroduced = (datum) => () => R.propOr(null, 'plantationForestIntroducedArea', datum)

export const getOtherPlantedForest = (datum) => () => R.propOr(null, 'otherPlantedForestArea', datum)

export const getPlantedForest = (datum) => () => {
  const plantationForest = getPlantationForest(datum)()
  const otherPlantedForest = getOtherPlantedForest(datum)()
  return NumberUtils.sum([plantationForest, otherPlantedForest])
}

export const getTotalForest = (datum) => () => {
  const naturalForest = getNaturalForest(datum)()
  const plantedForest = getPlantedForest(datum)()
  return NumberUtils.sum([naturalForest, plantedForest])
}

// ==== By Year getter functions

const _getDatumValueByYear = (year, getDatumValueFn) => (state) =>
  R.pipe(_getFra, FraUtils.getDatumByYear(year), (datum) => getDatumValueFn(datum)(state))(state)

export const getNaturalForestByYear = (year) => _getDatumValueByYear(year, getNaturalForest)
