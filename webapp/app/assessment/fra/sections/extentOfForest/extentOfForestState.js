import * as R from 'ramda'

import { sub, sum } from '@common/bignumberUtils'

import * as CountryState from '@webapp/app/country/countryState'
import * as TableWithOdpState from '@webapp/app/assessment/fra/components/tableWithOdp/tableWithOdpState'

const section = 'extentOfForest'

// ==== Assessment Fra config areas getter functions

export const getForestArea2015Value = year => R.pipe(
  CountryState.getConfigFra2015ForestAreas,
  R.prop(year),
)

// ==== Datum getter functions

export const getFaoStatArea = datum => R.pipe(
  CountryState.getConfigFaoStat,
  R.path([datum.name, 'area']),
)

export const getForest = datum => () => R.propOr(null, 'forestArea', datum)

export const getOtherWoodedLand = datum => () => R.propOr(null, 'otherWoodedLand', datum)

export const getOtherLand = datum => state => {
  const forestArea = getForest(datum)()
  const otherWoodedLand = getOtherWoodedLand(datum)()
  const faoStatArea = getFaoStatArea(datum)(state)

  return sub(faoStatArea, sum([forestArea, otherWoodedLand]))
}

// ==== By Year getter functions

export const getForestByYear = year => TableWithOdpState.getFieldByYear(section, 'forestArea', year)
