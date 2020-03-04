import * as R from 'ramda'

import * as CountryState from '@webapp/app/country/countryState'
import { sub, sum } from '@common/bignumberUtils'

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
