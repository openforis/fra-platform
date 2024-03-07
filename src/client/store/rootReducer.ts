import { combineReducers } from 'redux'

import { FileUploadSlice } from 'client/store/ui/fileUpload'
import { RepositorySlice } from 'client/store/ui/repository'

import AreaSlice from './area/slice'
import AssessmentSlice from './assessment/slice'
import DataSlice from './data/slice'
import LoginSlice from './login/slice'
import MetadataSlice from './metadata/slice'
import { AreaSelectorSlice } from './ui/areaSelector'
import { AssessmentSectionSlice } from './ui/assessmentSection/slice'
import DataExportSlice from './ui/dataExport/slice'
import DataLockSlice from './ui/dataLock/slice'
import GeoSlice from './ui/geo/slice'
import HomeSlice from './ui/home/slice'
import MessageCenterSlice from './ui/messageCenter/slice'
import NavigationSlice from './ui/navigation/slice'
import NotificationSlice from './ui/notification/slice'
import OriginalDataPointSlice from './ui/originalDataPoint/slice'
import ReviewSlice from './ui/review/slice'
import { TablePaginatedSlice } from './ui/tablePaginated'
import UserManagementSlice from './ui/userManagement/slice'
import UserSlice from './user/slice'

export default {
  area: AreaSlice,
  assessment: AssessmentSlice,
  login: LoginSlice,
  user: UserSlice,
  data: DataSlice,
  metadata: MetadataSlice,
  ui: combineReducers({
    [AreaSelectorSlice.name]: AreaSelectorSlice.reducer,
    [TablePaginatedSlice.name]: TablePaginatedSlice.reducer,
    [AssessmentSectionSlice.name]: AssessmentSectionSlice.reducer,
    dataExport: DataExportSlice,
    dataLock: DataLockSlice,
    [FileUploadSlice.name]: FileUploadSlice.reducer,
    home: HomeSlice,
    messageCenter: MessageCenterSlice,
    navigation: NavigationSlice,
    notification: NotificationSlice,
    originalDataPoint: OriginalDataPointSlice,
    [RepositorySlice.name]: RepositorySlice.reducer,
    review: ReviewSlice,
    userManagement: UserManagementSlice,
  }),
  geo: GeoSlice,
}
