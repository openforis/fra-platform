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

export const getFaoStatArea = year => R.pipe(
  CountryState.getConfigFaoStat,
  R.path([year, 'area']),
)

// ==== Datum getter functions

export const getOtherLandArea = datum => state => {
  const { name: year, forestArea, otherWoodedLand } = datum
  const faoStatLandArea = getFaoStatArea(year)(state)
  return sub(faoStatLandArea, sum([forestArea, otherWoodedLand]))
}

// ==== By Year getter functions

export const getForestAreaByYear = year => TableWithOdpState.getFieldByYear(section, 'forestArea', year)

export const getOtherWoodedLandByYear = year => TableWithOdpState.getFieldByYear(section, 'otherWoodedLand', year)

export const getOtherLandAreaByYear = year => state => {
  const forestArea = getForestAreaByYear(year)(state)
  const otherWoodedLand = getOtherWoodedLandByYear(year)(state)
  const faoStatLandArea = getFaoStatArea(year)(state)

  return sub(faoStatLandArea, sum([forestArea, otherWoodedLand]))
}
