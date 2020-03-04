import * as R from 'ramda'

import * as CountryState from '@webapp/app/country/countryState'
import { sub, sum } from '@common/bignumberUtils'

// ==== Utility functions

export const getFaoStatArea = year => R.pipe(
  CountryState.getConfigFaoStat,
  R.path([year, 'area']),
)

export const getOtherLandArea = datum => state => {
  const { name: year, forestArea, otherWoodedLand } = datum
  const faoStatLandArea = getFaoStatArea(year)(state)
  return sub(faoStatLandArea, sum([forestArea, otherWoodedLand]))
}
