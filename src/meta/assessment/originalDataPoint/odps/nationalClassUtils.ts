import BigNumber from 'bignumber.js'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPNationalClass } from 'meta/assessment/originalDataPoint/odpNationalClass'

export const calculateNationalClassForestArea = (nc: ODPNationalClass): string | null => {
  return nc.area && Numbers.format((Number(nc.area) * Number(nc.forestPercent)) / 100)
}

export const calculateNationalClassNaturalForestPercentArea = (nc: ODPNationalClass): BigNumber | null => {
  return nc.area
    ? Numbers.mul(nc.area, Numbers.div(Numbers.mul(nc.forestNaturalPercent, nc.forestPercent), 10000))
    : null
}

export const calculateNationalClassOtherLandPercent = (nc: ODPNationalClass): string | null => {
  if (!Objects.isEmpty(nc.forestPercent) || !Objects.isEmpty(nc.otherWoodedLandPercent)) {
    return Numbers.format(Numbers.sub(100, Numbers.add(nc.forestPercent ?? 0, nc.otherWoodedLandPercent ?? 0)), 3)
  }

  return null
}

export const calculateNationalClassPlantationForestPercentArea = (nc: ODPNationalClass): BigNumber | null => {
  return nc.area
    ? Numbers.mul(nc.area, Numbers.div(Numbers.mul(nc.forestPlantationPercent, nc.forestPercent), 10000))
    : null
}

export const hasNaturallyRegenerating = (nc: ODPNationalClass): boolean => {
  return (
    !Objects.isEmpty(nc.forestNaturalPercent) && Number(nc.forestNaturalPercent) > 0 && Number(nc.forestPercent) > 0
  )
}
