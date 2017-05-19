import { combineReducers } from 'redux'

import applicationError from './applicationError/reducer'
import nationalDataEntry from './nationalDataEntry/reducers'
import originalDataPoint from './originalDataPoint/reducers'
import autoSave from './autosave/reducer'
import router from './router/reducers'

export default combineReducers({
  applicationError,
  nationalDataEntry,
  originalDataPoint,
  autoSave,
  router
})
