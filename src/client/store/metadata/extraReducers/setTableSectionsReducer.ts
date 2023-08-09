import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { setTableSections } from 'client/store/metadata/actions/setTableSections'
import { MetadataState } from 'client/store/metadata/state'

export const setTableSectionsReducer = (builder: ActionReducerMapBuilder<MetadataState>) => {
  builder.addCase(setTableSections, (state, { payload }) => {
    const { tableSections, assessmentName, cycleName } = payload

    Objects.setInPath({
      obj: state,
      path: ['tableSections', assessmentName, cycleName],
      value: { ...state.tableSections?.[assessmentName]?.[cycleName], ...tableSections },
    })
  })
}
