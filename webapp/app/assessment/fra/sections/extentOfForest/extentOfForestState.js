import * as R from 'ramda'
import * as FRA from '@common/assessment/fra'

import { sub, sum } from '@common/bignumberUtils'

import * as CountryState from '@webapp/app/country/countryState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as TableWithOdpState from '@webapp/app/assessment/fra/components/tableWithOdp/tableWithOdpState'

export const keys = {
  showOdps: 'showOdps',
}

const section = FRA.sections['1'].children.a

export const getSectionData = AssessmentState.getSectionData(FRA.type, section.name, section.tables.extentOfForest)

const _getSectionDataProp = (propName, defaultTo = null) => R.pipe(getSectionData, R.propOr(defaultTo, propName))

const getFra = _getSectionDataProp('fra', null)
const getFraNoOdps = _getSectionDataProp('fraNoNDPs', null)

const _hasFraOriginalDataPoints = R.pipe(R.defaultTo([]), R.filter(R.propEq('type', 'odp')), R.length, R.lt(0))

export const hasOriginalDataPoints = R.pipe(getFra, _hasFraOriginalDataPoints)

export const useDescriptions = R.pipe(getFra, R.ifElse(R.isNil, R.F, R.pipe(_hasFraOriginalDataPoints, R.not)))

export const showOriginalDataPoints = R.pipe(getSectionData, R.propOr(true, keys.showOdps))

// ==== AssessmentSectionState functions

export const isSectionDataEmpty = () =>
  R.pipe(
    getFra,
    R.defaultTo([]),
    R.map(R.omit(['year', 'name', 'type'])),
    R.map(R.values),
    R.flatten,
    R.reject(R.isNil),
    R.isEmpty
  )

export const getExtentOfForestData = () => R.ifElse(showOriginalDataPoints, getFra, getFraNoOdps)

// ==== Assessment Fra config areas getter functions

export const getForestArea2015Value = year => R.pipe(CountryState.getConfigFra2015ForestAreas, R.prop(year))

// ==== Datum getter functions

export const getFaoStatArea = datum => R.pipe(CountryState.getConfigFaoStat, R.path([datum.name, 'area']))

export const getForest = datum => () => R.propOr(null, 'forestArea', datum)

export const getOtherWoodedLand = datum => () => R.propOr(null, 'otherWoodedLand', datum)

export const getOtherLand = datum => state => {
  const forestArea = getForest(datum)()
  const otherWoodedLand = getOtherWoodedLand(datum)()
  const faoStatArea = getFaoStatArea(datum)(state)

  return sub(faoStatArea, sum([forestArea, otherWoodedLand]))
}

// ==== By Year getter functions

export const getForestByYear = year => TableWithOdpState.getFieldByYear(section.name, 'forestArea', year)

// ==== By Year index getter functions

export const getForestByYearFraIdx = idx => getForestByYear(FRA.years[idx])

// ====== Climatic domain table functions

export const rowsClimaticDomain = ['boreal', 'temperate', 'subtropical', 'tropical']

export const getClimaticDomainConfigValue = (colIdx, rowIdx) =>
  R.pipe(CountryState.getConfigClimaticDomainPercents2015, R.prop(rowsClimaticDomain[rowIdx]))
