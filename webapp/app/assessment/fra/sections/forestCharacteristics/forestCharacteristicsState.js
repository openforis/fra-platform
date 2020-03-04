import { sum } from '@common/bignumberUtils'

import * as TableWithOdpState from '@webapp/app/assessment/fra/components/tableWithOdp/tableWithOdpState'

const section = 'forestCharacteristics'

// ==== By Year getter functions

export const getPlantationForestAreaByYear = year => TableWithOdpState.getFieldByYear(section, 'plantationForestArea', year)
export const getOtherPlantedForestAreaByYear = year => TableWithOdpState.getFieldByYear(section, 'otherPlantedForestArea', year)
export const getNaturalForestAreaByYear = year => TableWithOdpState.getFieldByYear(section, 'naturalForestArea', year)

export const getTotalForestAreaByYear = year => state => {
  const plantation = getPlantationForestAreaByYear(year)(state)
  const otherPlanted = getOtherPlantedForestAreaByYear(year)(state)
  const naturalForest = getNaturalForestAreaByYear(year)(state)

  return sum([plantation, otherPlanted, naturalForest])
}
