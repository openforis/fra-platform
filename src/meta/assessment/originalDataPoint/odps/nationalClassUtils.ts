import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPNationalClass } from 'meta/assessment/originalDataPoint/odpNationalClass'

export const calculateNationalClassOtherLandPercent = (nc: ODPNationalClass): string | null => {
  if (!Objects.isEmpty(nc.forestPercent) || !Objects.isEmpty(nc.otherWoodedLandPercent)) {
    return Numbers.format(Numbers.sub(100, Numbers.add(nc.forestPercent ?? 0, nc.otherWoodedLandPercent ?? 0)), 3)
  }

  return null
}

export const hasNaturallyRegenerating = (nc: ODPNationalClass): boolean => {
  return (
    !Objects.isEmpty(nc.forestNaturalPercent) && Number(nc.forestNaturalPercent) > 0 && Number(nc.forestPercent) > 0
  )
}
