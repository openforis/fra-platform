import { createSelector } from '@reduxjs/toolkit'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { RootState } from 'client/store/RootState'
import { AssessmentSectionSlice } from 'client/store/ui/assessmentSection/slice'

const _getState = (state: RootState) => state.ui[AssessmentSectionSlice.name]

const isDescriptionEditEnabled = createSelector(
  [_getState, (_, sectionName: SectionName) => sectionName, (_, __, name: CommentableDescriptionName) => name],
  (state, sectionName, name) => state.descriptionsEditEnabled?.[sectionName]?.[name] ?? false
)

const showOriginalDataPoint = createSelector(_getState, (state) => state.showOriginalDataPoint)

export const AssessmentSectionSelectors = {
  isDescriptionEditEnabled,
  showOriginalDataPoint,
}
