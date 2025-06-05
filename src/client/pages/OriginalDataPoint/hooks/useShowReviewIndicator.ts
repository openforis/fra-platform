import { SectionName, SectionNames } from 'meta/assessment/section'

import { useCanViewReview } from 'client/store/user/hooks/auth'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'

export const useShowReviewIndicator = (sectionName: SectionName = SectionNames.extentOfForest) => {
  const canEditData = useIsEditODPEnabled()
  const canViewReview = useCanViewReview(sectionName)

  return canEditData || canViewReview
}
