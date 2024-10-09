import { OriginalDataPoint } from 'meta/assessment'

import { useCanViewReview } from 'client/store/user/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'

export const useShowReviewIndicator = (originalDataPoint: OriginalDataPoint, sectionName = 'extentOfForest') => {
  const { print } = useIsPrintRoute()

  const canViewReview = useCanViewReview(sectionName)
  return originalDataPoint.id && !print && canViewReview
}
