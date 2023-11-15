import { OriginalDataPoint } from 'meta/assessment'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCanEditData } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useCanEditData'

export const useShowReviewIndicator = (originalDataPoint: OriginalDataPoint) => {
  const { print } = useIsPrintRoute()

  const canEditData = useCanEditData(originalDataPoint)
  return originalDataPoint.id && !print && canEditData
}
