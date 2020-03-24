import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'
import * as FraUtils from '@common/fraUtils'
import * as NumberUtils from '@common/bignumberUtils'
import { isPrintingMode } from '@webapp/app/assessment/components/print/printAssessment'

import * as CountryState from '@webapp/app/country/countryState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

export const keys = {
  showOdps: 'showOdps',
}

const section = FRA.sections['1'].children.a

const _getSectionProp = (propName, defaultValue = null) =>
  AssessmentState.getSectionProp(FRA.type, section.name, propName, defaultValue)

const _getFra = AssessmentState.getFra(FRA.type, section.name, section.tables.extentOfForest)
const _getFraNoOdps = AssessmentState.getFraNoNDPs(FRA.type, section.name, section.tables.extentOfForest)

export const hasOriginalDataPoints = R.pipe(_getFra, FraUtils.hasOdps)

export const useDescriptions = R.pipe(_getFra, R.ifElse(R.isNil, R.F, R.pipe(FraUtils.hasOdps, R.not)))

export const showOriginalDataPoints = _getSectionProp(keys.showOdps, true)

export const isExtentOfForestEmpty = () => R.pipe(_getFra, FraUtils.isTableWithOdpEmpty)

export const getExtentOfForestData = () =>
  R.pipe(
    R.ifElse(showOriginalDataPoints, _getFra, _getFraNoOdps),
    R.when(R.always(isPrintingMode()), FraUtils.filterFraYears)
  )

// ==== Assessment Fra config areas getter functions

export const getForestArea2015Value = year => R.pipe(CountryState.getConfigFra2015ForestAreas, R.prop(year))

export const getFaoStatAreaByYear = year => R.pipe(CountryState.getConfigFaoStat, R.path([year, 'area']))

export const getFaoStatArea = datum => getFaoStatAreaByYear(datum.name)

// ==== Datum getter functions

export const getForest = datum => () => R.propOr(null, 'forestArea', datum)

export const getOtherWoodedLand = datum => () => R.propOr(null, 'otherWoodedLand', datum)

export const getOtherLand = datum => state => {
  const forestArea = getForest(datum)()
  const otherWoodedLand = getOtherWoodedLand(datum)()
  const faoStatArea = getFaoStatArea(datum)(state)

  return NumberUtils.sub(faoStatArea, NumberUtils.sum([forestArea, otherWoodedLand]))
}

// ==== By Year getter functions

const _getDatumValueByYear = (year, getDatumValueFn) => state =>
  R.pipe(getExtentOfForestData(), FraUtils.getDatumByYear(year), datum => getDatumValueFn(datum)(state))(state)

export const getForestByYear = year => _getDatumValueByYear(year, getForest)

export const getOtherLandByYear = year => _getDatumValueByYear(year, getOtherLand)

// ==== By Year index getter functions

export const getForestByYearFraIdx = idx => getForestByYear(FRA.yearsTable[idx])

export const getForestByYearAnnualIdx = idx => getForestByYear(FRA.yearsAnnual[idx])

// ====== Climatic domain table functions

export const rowsClimaticDomain = ['boreal', 'temperate', 'subtropical', 'tropical']

export const getClimaticDomainConfigValue = (colIdx, rowIdx) =>
  R.pipe(CountryState.getConfigClimaticDomainPercents2015, R.prop(rowsClimaticDomain[rowIdx]))
