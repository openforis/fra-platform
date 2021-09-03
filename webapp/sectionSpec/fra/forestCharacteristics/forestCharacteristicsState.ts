import * as R from 'ramda'

import { FRA } from '@core/assessment'
import FraUtils from '@common/fraUtils'
import * as NumberUtils from '@common/bignumberUtils'

import * as CountryState from '@webapp/app/country/countryState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ExtentOfForestState from '@webapp/sectionSpec/fra/extentOfForest/extentOfForestState'
import { AppSelectors } from '@webapp/store/app/app.slice'

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

export const hasOriginalDataPoints = (state: any) => {
  const extentOfForestHasOdps = ExtentOfForestState.hasOriginalDataPoints(state)
  const useOriginalDataPointsInFoc = !!CountryState.getConfigUseOriginalDataPointsInFoc(state)
  return extentOfForestHasOdps && useOriginalDataPointsInFoc
}

export const useDescriptions = R.ifElse(
  AssessmentState.isSectionDataLoaded(FRA.type, section.name, section.tables.forestCharacteristics),
  R.pipe(hasOriginalDataPoints, R.not),
  R.always(false)
)

export const getForestCharacteristicsData = () => (state: any) =>
  R.pipe(
    R.ifElse(hasOriginalDataPoints, _getFra, _getFraNoOdps),
    R.when(R.always(AppSelectors.selectPrintView(state)), FraUtils.filterFraYears)
  )(state)

// ==== Datum getter functions

export const getNaturalForest = (datum: any) => () => R.propOr(null, 'naturalForestArea', datum)

export const getPlantationForest = (datum: any) => () => R.propOr(null, 'plantationForestArea', datum)

export const getPlantationForestIntroduced = (datum: any) => () =>
  R.propOr(null, 'plantationForestIntroducedArea', datum)

export const getOtherPlantedForest = (datum: any) => () => R.propOr(null, 'otherPlantedForestArea', datum)

export const getPlantedForest = (datum: any) => () => {
  const plantationForest = getPlantationForest(datum)()
  const otherPlantedForest = getOtherPlantedForest(datum)()
  return NumberUtils.sum([plantationForest, otherPlantedForest])
}

export const getTotalForest = (datum: any) => () => {
  const naturalForest = getNaturalForest(datum)()
  const plantedForest = getPlantedForest(datum)()
  return NumberUtils.sum([naturalForest, plantedForest])
}

// ==== By Year getter functions

const _getDatumValueByYear = (year: any, getDatumValueFn: any) => (state: any) =>
  R.pipe(_getFra, FraUtils.getDatumByYear(year), (datum: any) => getDatumValueFn(datum)(state))(state)

export const getNaturalForestByYear = (year: any) => _getDatumValueByYear(year, getNaturalForest)
