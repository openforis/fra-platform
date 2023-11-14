import { OriginalDataPoint } from 'meta/assessment'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCanEditData } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useCanEditData'

export const useIsDisabled = (originalDataPoint: OriginalDataPoint) => {
  const { print } = useIsPrintRoute()

  const canEditData = useCanEditData(originalDataPoint)
  return Boolean(print || !canEditData || !originalDataPoint.year)
}
