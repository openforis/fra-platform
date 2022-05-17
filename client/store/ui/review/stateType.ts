import { ReviewStatus, ReviewSummary } from '@meta/assessment/review'

export type ReviewState = {
  statuses: {
    [key: string]: ReviewStatus
  }
  summary: Array<ReviewSummary>
}
