import { createSelector } from '@reduxjs/toolkit'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { RootState } from 'client/store/types'
import { CountryReportSlice } from 'client/store/ui/countryReport/slice'
import { defaultGlobalCountries } from 'client/store/ui/countryReport/state'

const _getState = (state: RootState) => state.ui[CountryReportSlice.name]

const getGlobalCountries = createSelector(_getState, (state) => state.globalCountries ?? defaultGlobalCountries)

const isDataLocked = createSelector(_getState, (state) => state.locked)

const isNavigationVisible = createSelector(_getState, (state) => state.navigationVisible)

const isDescriptionEditEnabled = createSelector(
  [_getState, (_, sectionName: SectionName) => sectionName, (_, __, name: CommentableDescriptionName) => name],
  (state, sectionName, name) => state.descriptionsEditEnabled?.[sectionName]?.[name] ?? false
)

const showOriginalDataPoint = createSelector(_getState, (state) => state.showOriginalDataPoint)

export const CountryReportSelectors = {
  getGlobalCountries,
  isDataLocked,
  isDescriptionEditEnabled,
  isNavigationVisible,
  showOriginalDataPoint,
}
