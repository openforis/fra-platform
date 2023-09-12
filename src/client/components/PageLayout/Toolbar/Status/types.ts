import { AssessmentStatus } from 'meta/area/country'

export interface StatusTransition {
  status: AssessmentStatus
  direction: 'next' | 'previous'
}
