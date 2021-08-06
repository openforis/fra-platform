import { combineReducers } from 'redux'

import { dataExportReducer } from '@webapp/store/page/dataExport'

export const pageReducer = combineReducers({
  dataExport: dataExportReducer,
})
