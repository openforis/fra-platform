import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { setTableSections } from 'client/store/meta/actions/setTableSections'
import { MetaState } from 'client/store/meta/state'

export const setTableSectionsReducer = (builder: ActionReducerMapBuilder<MetaState>) => {
  builder.addCase(setTableSections, (state, { payload }) => {
    const { assessmentName, cycleName, tableSections } = payload

    Objects.setInPath({
      obj: state,
      path: ['tableSections', assessmentName, cycleName],
      value: { ...state.tableSections?.[assessmentName]?.[cycleName], ...tableSections },
    })
  })
}
