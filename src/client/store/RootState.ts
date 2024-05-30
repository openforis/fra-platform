import { AreaState } from './area/state'
import { AssessmentState } from './assessment/state'
import { DataState } from './data/state'
import { LoginState } from './login/stateType'
import { AreaSelectorSlice, AreaSelectorState } from './ui/areaSelector'
import { AssessmentSectionSlice, AssessmentSectionState } from './ui/assessmentSection'
import { DataExportState } from './ui/dataExport'
import { DataLockState } from './ui/dataLock'
import { FileUploadSlice, FileUploadState } from './ui/fileUpload'
import { GeoState } from './ui/geo/stateType'
import { HomeState } from './ui/home/stateType'
import { LinksSlice, LinksState } from './ui/links'
import { MessageCenterState } from './ui/messageCenter/stateType'
import { NavigationState } from './ui/navigation/stateType'
import { NotificationState } from './ui/notification/stateType'
import { OriginalDataPointState } from './ui/originalDataPoint'
import { RepositorySlice, RepositoryState } from './ui/repository'
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
    [AssessmentSectionSlice.name]: AssessmentSectionState
    dataExport: DataExportState
    dataLock: DataLockState
    [FileUploadSlice.name]: FileUploadState
    home: HomeState
    [LinksSlice.name]: LinksState
    messageCenter: MessageCenterState
    navigation: NavigationState
    notification: NotificationState
    originalDataPoint: OriginalDataPointState
    [RepositorySlice.name]: RepositoryState
    review: ReviewState
    tablePaginated: TablePaginatedState
    userManagement: UserManagementState
  }

  geo: GeoState
}
