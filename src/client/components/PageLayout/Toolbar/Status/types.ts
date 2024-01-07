import { AssessmentStatus } from 'meta/area'

export interface StatusTransition {
  status: AssessmentStatus
  direction: 'next' | 'previous'
}
