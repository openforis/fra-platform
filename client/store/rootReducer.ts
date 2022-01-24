import { combineReducers } from 'redux'
import OriginalDataPointSlice from './data/originalDataPoint/slice'
import AssessmentSlice from './assessment/slice'
import LoginSlice from './login/slice'
import UserSlice from './user/slice'
import NavigationSlice from './ui/navigation/slice'

export default {
  assessment: AssessmentSlice,
  login: LoginSlice,
  user: UserSlice,
  data: combineReducers({
    originalDataPoint: OriginalDataPointSlice,
  }),
  ui: combineReducers({
    navigation: NavigationSlice,
  }),
}
