import { combineReducers } from 'redux'

import { dataExportReducer } from '@webapp/store/page/dataExport'
import { homeReducer } from '@webapp/store/page/home'

export const pageReducer = combineReducers({
  dataExport: dataExportReducer,
  home: homeReducer,
})
