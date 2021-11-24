import { AssessmentStatus } from '@core/assessment'

export interface StatusTransition {
  status: AssessmentStatus
  direction: 'next' | 'previous'
}
