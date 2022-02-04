import { DataLockState } from '@client/store/ui/dataLock'
import { OriginalDataPointState } from './data/originalDataPoint'
import { NavigationState } from './ui/navigation/stateType'
import { AssessmentState } from './assessment/stateType'
import { LoginState } from './login/stateType'
import { UserState } from './user/stateType'
import { NotificationState } from './ui/notification/stateType'

export type RootState = {
  assessment: AssessmentState
  login: LoginState
  user: UserState

  data: {
    originalDataPoint: OriginalDataPointState
  }

  ui: {
    navigation: NavigationState
    notification: NotificationState
    dataLock: DataLockState
  }
}
