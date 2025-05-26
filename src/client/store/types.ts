import { AreaState } from 'client/store/area/state'
import { AssessmentState } from 'client/store/assessment/state'
import { DataState } from 'client/store/data'
import { LoginState } from 'client/store/login/stateType'
import { MetadataState } from 'client/store/metadata'
import store from 'client/store/store'
import { AreaSelectorSlice, AreaSelectorState } from 'client/store/ui/areaSelector'
import { AssessmentSectionSlice, AssessmentSectionState } from 'client/store/ui/assessmentSection'
import { DataExportState } from 'client/store/ui/dataExport'
import { DataLockState } from 'client/store/ui/dataLock'
import { FileUploadSlice, FileUploadState } from 'client/store/ui/fileUpload'
import { GeoState } from 'client/store/ui/geo/stateType'
import { HomeState } from 'client/store/ui/home/stateType'
import { LinksSlice, LinksState } from 'client/store/ui/links'
import { MessageCenterState } from 'client/store/ui/messageCenter'
import { NavigationState } from 'client/store/ui/navigation'
import { NotificationState } from 'client/store/ui/notification'
import { OriginalDataPointState } from 'client/store/ui/originalDataPoint'
import { RepositorySlice, RepositoryState } from 'client/store/ui/repository'
import { ReviewState } from 'client/store/ui/review'
import { TablePaginatedState } from 'client/store/ui/tablePaginated/state'
import { UserManagementState } from 'client/store/ui/userManagement'
import { UserState } from 'client/store/user'

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

export type AppDispatch = typeof store.dispatch
export type ThunkApiConfig = { dispatch: AppDispatch; state: RootState }
