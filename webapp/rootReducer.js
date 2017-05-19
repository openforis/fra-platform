import { combineReducers } from 'redux'

import applicationError from './applicationError/reducer'
import nationalDataEntry from './nationalDataEntry/reducers'
import originalDataPoint from './originalDataPoint/reducers'
import router from './router/reducers'

export  default combineReducers({
  applicationError, nationalDataEntry, originalDataPoint, router
})
