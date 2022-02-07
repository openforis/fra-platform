import { combineReducers } from 'redux'
import OriginalDataPointSlice from './data/originalDataPoint/slice'
import SectionSlice from './data/section/slice'
import AssessmentSlice from './assessment/slice'
import LoginSlice from './login/slice'
import UserSlice from './user/slice'
import NavigationSlice from './ui/navigation/slice'
import DataLockSlice from './ui/dataLock/slice'

export default {
  assessment: AssessmentSlice,
  login: LoginSlice,
  user: UserSlice,
  data: combineReducers({
    originalDataPoint: OriginalDataPointSlice,
    section: SectionSlice,
  }),
  ui: combineReducers({
    navigation: NavigationSlice,
    dataLock: DataLockSlice,
  }),
}
