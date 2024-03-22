import { Objects } from 'utils/objects'

import { ODPNationalClass } from 'meta/assessment/originalDataPoint/odpNationalClass'

export const hasNaturallyRegenerating = (nc: ODPNationalClass): boolean => {
  return (
    !Objects.isEmpty(nc.forestNaturalPercent) && Number(nc.forestNaturalPercent) > 0 && Number(nc.forestPercent) > 0
  )
}
