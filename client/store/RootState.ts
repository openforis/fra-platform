import { AssessmentState } from './assessment/stateType'
import { UserState } from './user/stateType'

export type RootState = {
  assessment: AssessmentState
  user: UserState
}
