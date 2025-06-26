import { createAction } from '@reduxjs/toolkit'

import { DataExportSelection } from 'client/store/dataExport/state'

export const updateSelection = createAction<{
  sectionName: string
  selection: DataExportSelection
}>('dataExport/selection/update')
