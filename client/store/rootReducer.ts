import { combineReducers } from 'redux'

import AssessmentSlice from './assessment/slice'
import LoginSlice from './login/slice'
import AssessmentSectionSlice from './pages/assessmentSection/slice'
import DataExportSlice from './pages/dataExport/slice'
import OriginalDataPointSlice from './pages/originalDataPoint/slice'
import DataLockSlice from './ui/dataLock/slice'
import GeoSlice from './ui/geo/slice'
import HomeSlice from './ui/home/slice'
import MessageCenterSlice from './ui/messageCenter/slice'
import NavigationSlice from './ui/navigation/slice'
import NotificationSlice from './ui/notification/slice'
import ReviewSlice from './ui/review/slice'
import UserSlice from './user/slice'

export default {
  assessment: AssessmentSlice,
  login: LoginSlice,
  user: UserSlice,
  pages: combineReducers({
    assessmentSection: AssessmentSectionSlice,
    dataExport: DataExportSlice,
    originalDataPoint: OriginalDataPointSlice,
  }),
  ui: combineReducers({
    dataLock: DataLockSlice,
    home: HomeSlice,
    messageCenter: MessageCenterSlice,
    navigation: NavigationSlice,
    notification: NotificationSlice,
    review: ReviewSlice,
  }),
  geo: GeoSlice,
}
