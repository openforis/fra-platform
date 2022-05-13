import { ReviewStatus } from '@meta/assessment/review'

export type ReviewState = {
  [section: string]: {
    [key: string]: ReviewStatus
  }
}
