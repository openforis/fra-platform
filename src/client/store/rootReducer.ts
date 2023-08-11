import { combineReducers } from 'redux'

import AreaSlice from './area/slice'
import AssessmentSlice from './assessment/slice'
import DataSlice from './data/slice'
import LoginSlice from './login/slice'
import MetadataSlice from './metadata/slice'
import assessmentFilesSlice from './ui/assessmentFiles/slice'
import AssessmentSectionSlice from './ui/assessmentSection/slice'
import DataExportSlice from './ui/dataExport/slice'
import DataLockSlice from './ui/dataLock/slice'
import GeoSlice from './ui/geo/slice'
import HomeSlice from './ui/home/slice'
import MessageCenterSlice from './ui/messageCenter/slice'
import NavigationSlice from './ui/navigation/slice'
import NotificationSlice from './ui/notification/slice'
import OriginalDataPointSlice from './ui/originalDataPoint/slice'
import ReviewSlice from './ui/review/slice'
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
    assessmentFiles: assessmentFilesSlice,
    assessmentSection: AssessmentSectionSlice,
    dataExport: DataExportSlice,
    dataLock: DataLockSlice,
    home: HomeSlice,
    messageCenter: MessageCenterSlice,
    navigation: NavigationSlice,
    notification: NotificationSlice,
    originalDataPoint: OriginalDataPointSlice,
    review: ReviewSlice,
    userManagement: UserManagementSlice,
  }),
  geo: GeoSlice,
}
