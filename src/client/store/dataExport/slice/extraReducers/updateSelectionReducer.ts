import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { updateSelection } from 'client/store/dataExport/actions/updateSelection'
import { DataExportState } from 'client/store/dataExport/state'

export const updateSelectionReducer = (builder: ActionReducerMapBuilder<DataExportState>) => {
  builder.addCase(updateSelection, (state, action) => {
    state.selection = action.payload.selection
  })
}
