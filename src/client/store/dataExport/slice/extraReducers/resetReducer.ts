import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { reset } from 'client/store/dataExport/actions/reset'
import { DataExportState, initialState } from 'client/store/dataExport/state'

export const resetReducer = (builder: ActionReducerMapBuilder<DataExportState>) => {
  builder.addCase(reset, () => initialState)
}
