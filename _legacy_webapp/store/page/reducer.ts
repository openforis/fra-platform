import { combineReducers } from 'redux'

import { DataExportReducer } from '../../store/page/dataExport'
import { HomeReducer } from '../../store/page/home'
import { OriginalDataPointReducer } from '../../store/page/originalDataPoint'

export const pageReducer = combineReducers({
  dataExport: DataExportReducer,
  home: HomeReducer,
  originalDataPoint: OriginalDataPointReducer,
})
