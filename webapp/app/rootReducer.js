import { combineReducers } from 'redux'

import applicationError from '../applicationError/reducer'
import extentOfForest from '../assessmentFra/extentOfForest/reducers'
import forestCharacteristics from '../assessmentFra/forestCharacteristics/reducer'
import growingStock from '../assessmentFra/growingStock/reducer'
import originalDataPoint from '../originalDataPoint/reducers'
import autoSave from '../autosave/reducer'
import navigation from '../navigation/reducers'
import router from '../router/reducers'
import user from '../user/reducer'
import traditionalTable from '../traditionalTable/reducer'
import descriptions from '../description/reducers'
import review from '../review/reducer'
import dashboard from '../dashboard/reducer'
import userManagement from '../userManagement/reducer'

export default combineReducers({
  applicationError,
  extentOfForest,
  forestCharacteristics,
  descriptions,
  originalDataPoint,
  autoSave,
  navigation,
  router,
  user,
  review,
  traditionalTable,
  growingStock,
  dashboard,
  userManagement
})
