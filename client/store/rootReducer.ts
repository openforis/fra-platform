import { combineReducers } from 'redux'
import OriginalDataPointSlice from './pages/originalDataPoint/slice'
import AssessmentSectionSlice from './pages/assessmentSection/slice'
import DataExportSlice from './pages/dataExport/slice'
import AssessmentSlice from './assessment/slice'
import LoginSlice from './login/slice'
import UserSlice from './user/slice'
import NavigationSlice from './ui/navigation/slice'
import DataLockSlice from './ui/dataLock/slice'
import NotificationSlice from './ui/notification/slice'
import MessageCenterSlice from './ui/messageCenter/slice'
import GeoSlice from './ui/geo/slice'

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
  }),
  geo: GeoSlice,
}
