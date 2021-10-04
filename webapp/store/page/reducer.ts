import { combineReducers } from 'redux'

import { DataExportReducer } from '@webapp/store/page/dataExport'
import { homeReducer } from '@webapp/store/page/home'

export const pageReducer = combineReducers({
  dataExport: DataExportReducer,
  home: homeReducer,
})
