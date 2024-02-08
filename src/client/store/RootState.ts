import { AreaState } from './area/state'
import { AssessmentState } from './assessment/state'
import { DataState } from './data/stateType'
import { LoginState } from './login/stateType'
import { AreaSelectorSlice, AreaSelectorState } from './ui/areaSelector'
import { AssessmentFilesState } from './ui/assessmentFiles/stateType'
import { AssessmentSectionSlice, AssessmentSectionState } from './ui/assessmentSection'
import { DataExportState } from './ui/dataExport'
import { DataLockState } from './ui/dataLock'
import { GeoState } from './ui/geo/stateType'
import { HomeState } from './ui/home/stateType'
import { MessageCenterState } from './ui/messageCenter/stateType'
import { NavigationState } from './ui/navigation/stateType'
import { NotificationState } from './ui/notification/stateType'
import { OriginalDataPointState } from './ui/originalDataPoint'
import { ReviewState } from './ui/review'
import { TablePaginatedState } from './ui/tablePaginated/state'
import { UserManagementState } from './ui/userManagement'
import { UserState } from './user/stateType'
import { MetadataState } from './metadata'

export type RootState = {
  area: AreaState
  assessment: AssessmentState
  login: LoginState
  user: UserState

  data: DataState
  metadata: MetadataState

  ui: {
    [AreaSelectorSlice.name]: AreaSelectorState
    assessmentFiles: AssessmentFilesState
    [AssessmentSectionSlice.name]: AssessmentSectionState
    dataExport: DataExportState
    dataLock: DataLockState
    home: HomeState
    messageCenter: MessageCenterState
    navigation: NavigationState
    notification: NotificationState
    originalDataPoint: OriginalDataPointState
    review: ReviewState
    tablePaginated: TablePaginatedState
    userManagement: UserManagementState
  }

  geo: GeoState
}
