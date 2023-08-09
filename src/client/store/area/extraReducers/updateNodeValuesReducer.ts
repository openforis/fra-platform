import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { AreaState } from 'client/store/area/state'
import { updateNodeValues } from 'client/store/data/actions/updateNodeValues'

export const updateNodeValuesReducer = (builder: ActionReducerMapBuilder<AreaState>) => {
  builder.addCase(updateNodeValues.fulfilled, (state, payload) => {
    const { assessmentName, cycleName, countryIso } = payload.meta.arg
    if (state.countries?.[assessmentName]?.[cycleName]?.[countryIso])
      state.countries[assessmentName][cycleName][countryIso].lastEdit = new Date().toISOString()
  })
}
