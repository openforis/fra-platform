import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getSections } from 'client/store/metadata/actions/getSections'
import { MetadataState } from 'client/store/metadata/state'

export const getSectionsReducer = (builder: ActionReducerMapBuilder<MetadataState>) => {
  builder.addCase(getSections.fulfilled, (state, action) => {
    const { assessmentName, cycleName } = action.meta.arg
    const sections = action.payload

    const path = ['sections', assessmentName, cycleName]
    Objects.setInPath({ obj: state, path, value: sections })
  })
}
