import { ReviewStatus } from '@meta/assessment'

import { useAppSelector } from '@client/store'

export const useReviewStatus = (key: string): ReviewStatus =>
  useAppSelector((state) => state.ui.review.statuses[key] || ({} as ReviewStatus))
