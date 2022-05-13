import { ReviewStatus } from '@meta/assessment'

import { useAppSelector } from '@client/store'

export const useReviewStatus = (section: string, key: string): ReviewStatus =>
  useAppSelector((state) => state.ui.review[section][key] || ({} as ReviewStatus))
