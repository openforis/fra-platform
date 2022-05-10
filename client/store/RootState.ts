import { DataLockState } from '@client/store/ui/dataLock'

import { AssessmentState } from './assessment/stateType'
import { LoginState } from './login/stateType'
import { AssessmentSectionState } from './pages/assessmentSection'
import { DataExportState } from './pages/dataExport'
import { OriginalDataPointState } from './pages/originalDataPoint'
import { GeoState } from './ui/geo/stateType'
import { MessageCenterState } from './ui/messageCenter/stateType'
import { NavigationState } from './ui/navigation/stateType'
import { NotificationState } from './ui/notification/stateType'
import { ReviewState } from './ui/review'
import { UserState } from './user/stateType'

export type RootState = {
  assessment: AssessmentState
  login: LoginState
  user: UserState

  pages: {
    originalDataPoint: OriginalDataPointState
    assessmentSection: AssessmentSectionState
    dataExport: DataExportState
  }

  ui: {
    navigation: NavigationState
    notification: NotificationState
    dataLock: DataLockState
    messageCenter: MessageCenterState
    review: ReviewState
  }

  geo: GeoState
}
