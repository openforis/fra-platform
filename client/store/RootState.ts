import { DataLockState } from '@client/store/ui/dataLock'
import { AssessmentSectionState } from './pages/assessmentSection'
import { OriginalDataPointState } from './pages/originalDataPoint'

import { NavigationState } from './ui/navigation/stateType'
import { AssessmentState } from './assessment/stateType'
import { LoginState } from './login/stateType'
import { UserState } from './user/stateType'
import { NotificationState } from './ui/notification/stateType'
import { MessageCenter } from './ui/messageCenter/stateType'

export type RootState = {
  assessment: AssessmentState
  login: LoginState
  user: UserState

  pages: {
    originalDataPoint: OriginalDataPointState
    assessmentSection: AssessmentSectionState
  }

  ui: {
    navigation: NavigationState
    notification: NotificationState
    dataLock: DataLockState
    messageCenter: MessageCenter
  }
}
