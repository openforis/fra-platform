import { combineReducers } from 'redux'

import AssessmentSlice from './assessment/slice'
import LoginSlice from './login/slice'
import AssessmentSectionSlice from './pages/assessmentSection/slice'
import DataExportSlice from './pages/dataExport/slice'
import OriginalDataPointSlice from './pages/originalDataPoint/slice'
import DataLockSlice from './ui/dataLock/slice'
import GeoSlice from './ui/geo/slice'
import MessageCenterSlice from './ui/messageCenter/slice'
import NavigationSlice from './ui/navigation/slice'
import NotificationSlice from './ui/notification/slice'
import ReviewSlice from './ui/review/slice'
import UserSlice from './user/slice'
import UserManagementSlice from './userManagement/slice'

export default {
  assessment: AssessmentSlice,
  login: LoginSlice,
  user: UserSlice,
  pages: combineReducers({
    originalDataPoint: OriginalDataPointSlice,
    assessmentSection: AssessmentSectionSlice,
    dataExport: DataExportSlice,
  }),
  ui: combineReducers({
    navigation: NavigationSlice,
    notification: NotificationSlice,
    dataLock: DataLockSlice,
    messageCenter: MessageCenterSlice,
    review: ReviewSlice,
  }),
  userManagement: UserManagementSlice,
  geo: GeoSlice,
}
