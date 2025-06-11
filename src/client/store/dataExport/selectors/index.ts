import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.dataExport

const getCountries = createSelector([getState], (state) => state.countries)

const getSelection = createSelector([getState], (state) => state.selection)

export const DataExportSelectors = {
  getCountries,
  getSelection,
}
