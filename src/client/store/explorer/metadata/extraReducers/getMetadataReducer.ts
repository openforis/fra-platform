import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getMetadata } from 'client/store/explorer/metadata/actions/getMetadata'
import { ExplorerMetadataState } from 'client/store/explorer/metadata/state'

export const getMetadataReducer = (builder: ActionReducerMapBuilder<ExplorerMetadataState>) => {
  builder.addCase(getMetadata.fulfilled, (state, action) => {
    const { assessmentName, cycleName, sectionNames } = action.meta.arg
    const sectionName = sectionNames[0]
    const sectionData = action.payload[sectionName]

    const path = [assessmentName, cycleName, sectionName]
    Objects.setInPath({ obj: state, path, value: sectionData })
  })
}
