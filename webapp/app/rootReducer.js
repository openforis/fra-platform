import { combineReducers } from 'redux'

import applicationError from '../applicationError/reducer'
import extentOfForest from '../extentOfForest/reducers'
import forestCharacteristics from '../forestCharacteristics/reducer'
import originalDataPoint from '../originalDataPoint/reducers'
import autoSave from '../autosave/reducer'
import navigation from '../navigation/reducers'
import router from '../router/reducers'
import user from '../user/reducer'
import traditionalTable from '../traditionalTable/reducer'
import descriptions from '../description/reducers'
import review from '../review/reducer'
import growingStock from '../growingStock/reducer'
import dashboard from '../dashboard/reducer'

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
  dashboard
})
