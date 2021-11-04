import * as R from 'ramda'

import { FRA } from '@core/assessment'
import FraUtils from '@common/fraUtils'
import * as NumberUtils from '@core/utils/numbers'

import * as AppState from '@webapp/store/app/state'
import * as CountryState from '@webapp/app/country/countryState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

export const variables = {
  forestArea: 'forestArea',
  otherWoodedLand: 'otherWoodedLand',
}

export const keys = {
  showOdps: 'showOdps',
}

const section = FRA.sections['1'].children.a

const _getSectionProp = (propName: any, defaultValue: any = null) =>
  AssessmentState.getSectionProp(FRA.type, section.name, propName, defaultValue)

export const getFra = AssessmentState.getFra(FRA.type, section.name, section.tables.extentOfForest)
const _getFraNoOdps = AssessmentState.getFraNoNDPs(FRA.type, section.name, section.tables.extentOfForest)

export const hasOriginalDataPoints = R.pipe(getFra, FraUtils.hasOdps)

export const useDescriptions = R.pipe(getFra, R.ifElse(R.isNil, R.F, R.pipe(FraUtils.hasOdps, R.not)))

export const showOriginalDataPoints = _getSectionProp(keys.showOdps, true)

export const isExtentOfForestEmpty = () => R.pipe(getFra, FraUtils.isTableWithOdpEmpty)

export const getExtentOfForestData = () => (state: any) =>
  R.pipe(
    R.ifElse(showOriginalDataPoints, getFra, _getFraNoOdps),
    R.when(R.always(AppState.isPrintView(state)), FraUtils.filterFraYears)
  )(state)

// ==== Assessment Fra config areas getter functions

export const getForestArea2015Value = (year: any) => R.pipe(CountryState.getConfigFra2015ForestAreas, R.prop(year))

export const getFaoStatAreaByYear = (year: any) => R.pipe(CountryState.getConfigFaoStat, R.path([year, 'area']))

export const getFaoStatArea = (datum: any) => getFaoStatAreaByYear(datum.name)

// ==== Datum getter functions

export const getForest = (datum: any) => () => R.propOr(null, 'forestArea', datum)

export const getOtherWoodedLand = (datum: any) => () => R.propOr(null, 'otherWoodedLand', datum)

export const getOtherLand = (datum: any) => (state: any) => {
  const forestArea = getForest(datum)()
  const otherWoodedLand = getOtherWoodedLand(datum)()
  const faoStatArea: any = getFaoStatArea(datum)(state)

  return NumberUtils.sub(faoStatArea, NumberUtils.sum([forestArea, otherWoodedLand]))
}

// ==== By Year getter functions

const _getDatumValueByYear = (year: any, getDatumValueFn: any) => (state: any) =>
  R.pipe(getFra, FraUtils.getDatumByYear(year), (datum: any) => getDatumValueFn(datum)(state))(state)

export const getForestByYear = (year: any) => _getDatumValueByYear(year, getForest)

export const getOtherLandByYear = (year: any) => _getDatumValueByYear(year, getOtherLand)

// ==== By Year index getter functions

export const getForestByYearFraIdx = (idx: any) => getForestByYear(FRA.yearsTable[idx])

export const getForestByYearAnnualIdx = (idx: any) => getForestByYear(FRA.yearsAnnual[idx])

// ====== Climatic domain table functions

export const rowsClimaticDomain = ['boreal', 'temperate', 'subtropical', 'tropical']

export const getClimaticDomainConfigValue = (colIdx: any, rowIdx: any) =>
  R.pipe(CountryState.getConfigClimaticDomainPercents2015, R.prop(rowsClimaticDomain[rowIdx]))
