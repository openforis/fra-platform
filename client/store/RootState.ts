import { UiState } from '@client/store/ui'
import { AssessmentState } from './assessment/stateType'
import { LoginState } from './login/stateType'
import { UserState } from './user/stateType'

export type RootState = {
  assessment: AssessmentState
  login: LoginState
  user: UserState
  ui: UiState
}
