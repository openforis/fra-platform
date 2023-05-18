import { AssessmentState } from './assessment/stateType'
import { DataState } from './data/stateType'
import { LoginState } from './login/stateType'
import { AssessmentFilesState } from './ui/assessmentFiles/stateType'
import { AssessmentSectionState } from './ui/assessmentSection'
import { DataExportState } from './ui/dataExport'
import { DataLockState } from './ui/dataLock'
import { GeoState } from './ui/geo/stateType'
import { HomeState } from './ui/home/stateType'
import { MessageCenterState } from './ui/messageCenter/stateType'
import { NavigationState } from './ui/navigation/stateType'
import { NotificationState } from './ui/notification/stateType'
import { OriginalDataPointState } from './ui/originalDataPoint'
import { ReviewState } from './ui/review'
import { UserManagementState } from './ui/userManagement'
import { UserState } from './user/stateType'
import { MetadataState } from './metadata'

export type RootState = {
  assessment: AssessmentState
  login: LoginState
  user: UserState

  data: DataState
  metadata: MetadataState

  ui: {
    assessmentFiles: AssessmentFilesState
    assessmentSection: AssessmentSectionState
    dataExport: DataExportState
    dataLock: DataLockState
    home: HomeState
    messageCenter: MessageCenterState
    navigation: NavigationState
    notification: NotificationState
    originalDataPoint: OriginalDataPointState
    review: ReviewState
    userManagement: UserManagementState
  }

  geo: GeoState
}
