import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { RootState } from 'client/store/RootState'

import { ExplorerMetadataSlice } from '../slice'

const _getState = (state: RootState) => state.explorer[ExplorerMetadataSlice.name]

export const getSectionMetadata = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, sectionName: string) => sectionName,
  ],
  (metadata, assessmentName, cycleName, sectionName) => metadata?.[assessmentName]?.[cycleName]?.[sectionName]
)

export const ExplorerMetadataSelectors = {
  getSectionMetadata,
}
