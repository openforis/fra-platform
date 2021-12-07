import { User } from '@core/meta/user'
import { AssessmentState } from './assessment/stateType'

export type RootState = {
  assessment: AssessmentState
  user: User
}
