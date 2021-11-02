import { combineReducers } from 'redux'

import { DataExportReducer } from '@webapp/store/page/dataExport'
import { HomeReducer } from '@webapp/store/page/home'
import { OriginalDataPointReducer } from '@webapp/store/page/originalDataPoint'

export const pageReducer = combineReducers({
  dataExport: DataExportReducer,
  home: HomeReducer,
  originalDataPoint: OriginalDataPointReducer,
})
