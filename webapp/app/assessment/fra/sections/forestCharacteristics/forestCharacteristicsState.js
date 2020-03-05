import * as R from 'ramda'

import { sum } from '@common/bignumberUtils'

// const section = 'forestCharacteristics'

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
