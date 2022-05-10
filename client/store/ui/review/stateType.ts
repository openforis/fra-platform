import { ReviewStatus } from '@meta/assessment/review'

export type ReviewState = {
  statuses: {
    [key: string]: ReviewStatus
  }
}
