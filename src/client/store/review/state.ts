import { ReviewStatus, ReviewSummary } from 'meta/assessment/review'

export type ReviewState = {
  status: {
    [key: string]: ReviewStatus
  }
  summary: Array<ReviewSummary>
}
export const initialState: ReviewState = { status: {}, summary: [] }
