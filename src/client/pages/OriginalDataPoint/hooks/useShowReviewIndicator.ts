import { SectionName, SectionNames } from 'meta/assessment'

import { useCanViewReview } from 'client/store/user/hooks'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'

export const useShowReviewIndicator = (sectionName: SectionName = SectionNames.extentOfForest) => {
  const canEditData = useIsEditODPEnabled()
  const canViewReview = useCanViewReview(sectionName)

  return canEditData || canViewReview
}
