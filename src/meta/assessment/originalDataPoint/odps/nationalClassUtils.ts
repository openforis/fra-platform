import BigNumber from 'bignumber.js'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPNationalClass } from 'meta/assessment/originalDataPoint/odpNationalClass'

export const calculateNationalClassOtherLandPercent = (nc: ODPNationalClass): BigNumber | null => {
  if (Objects.isEmpty(nc.forestPercent) || Objects.isEmpty(nc.otherWoodedLandPercent)) return null

  return Numbers.sub(100, Numbers.add(nc.forestPercent, nc.otherWoodedLandPercent))
}

export const hasNaturallyRegenerating = (nc: ODPNationalClass): boolean => {
  return (
    !Objects.isEmpty(nc.forestNaturalPercent) && Number(nc.forestNaturalPercent) > 0 && Number(nc.forestPercent) > 0
  )
}
