import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { ExplorerMetadataSlice } from 'client/store/explorer/metadata/slice'
import { ExplorerMetadataState } from 'client/store/explorer/metadata/state'
import { RootState } from 'client/store/types'

const _getState = (state: RootState): ExplorerMetadataState => state.explorer?.[ExplorerMetadataSlice.name]

export const getSectionMetadata = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName): string => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName): string => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, sectionName: string): string =>
      sectionName,
  ],
  (metadata, assessmentName, cycleName, sectionName) => metadata?.[assessmentName]?.[cycleName]?.[sectionName]
)

export const ExplorerMetadataSelectors = {
  getSectionMetadata,
}
