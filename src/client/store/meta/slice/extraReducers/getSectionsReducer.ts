import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getSections } from 'client/store/meta/actions/getSections'
import { MetaState } from 'client/store/meta/state'

export const getSectionsReducer = (builder: ActionReducerMapBuilder<MetaState>): void => {
  builder.addCase(getSections.fulfilled, (state, action) => {
    const { assessmentName, cycleName } = action.meta.arg
    const sections = action.payload

    const path = ['sections', assessmentName, cycleName]
    Objects.setInPath({ obj: state, path, value: sections })
  })
}
