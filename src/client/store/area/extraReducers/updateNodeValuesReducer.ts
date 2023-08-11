import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { AreaState } from 'client/store/area/state'
import { updateNodeValues } from 'client/store/data/actions/updateNodeValues'

export const updateNodeValuesReducer = (builder: ActionReducerMapBuilder<AreaState>) => {
  builder.addCase(updateNodeValues.fulfilled, (state, payload) => {
    const { assessmentName, cycleName, countryIso } = payload.meta.arg

    const path = ['countries', assessmentName, cycleName, countryIso, 'lastEdit']
    const value = new Date().toISOString()

    Objects.setInPath({
      obj: state,
      path,
      value,
    })
  })
}
