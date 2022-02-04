import { combineReducers } from 'redux'
import OriginalDataPointSlice from './data/originalDataPoint/slice'
import AssessmentSlice from './assessment/slice'
import LoginSlice from './login/slice'
import UserSlice from './user/slice'
import NavigationSlice from './ui/navigation/slice'
import DataLockSlice from './ui/dataLock/slice'
import NotificationSlice from './ui/notification/slice'

export default {
  assessment: AssessmentSlice,
  login: LoginSlice,
  user: UserSlice,
  data: combineReducers({
    originalDataPoint: OriginalDataPointSlice,
  }),
  ui: combineReducers({
    navigation: NavigationSlice,
    notification: NotificationSlice,
    dataLock: DataLockSlice,
  }),
}
