import { getReviewStatus } from 'client/store/review/actions/getReviewStatus'
import { getReviewSummary } from 'client/store/review/actions/getReviewSummary'
import { reset } from 'client/store/review/actions/reset'

export const ReviewActions = {
  getReviewStatus,
  getReviewSummary,
  reset,
}
