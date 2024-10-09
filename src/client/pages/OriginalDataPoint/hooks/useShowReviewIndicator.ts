import { SectionNames } from 'meta/assessment'

import { useCanViewReview } from 'client/store/user/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'

export const useShowReviewIndicator = () => {
  const { print } = useIsPrintRoute()

  const canEditData = useIsEditODPEnabled()
  const canViewReview = useCanViewReview(SectionNames.extentOfForest)
  return !print && (canEditData || canViewReview)
}
