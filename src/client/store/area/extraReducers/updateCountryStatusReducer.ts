import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { updateCountryStatus } from 'client/store/area/actions/updateCountryStatus'
import { AreaState } from 'client/store/area/state'

export const updateCountryStatusReducer = (builder: ActionReducerMapBuilder<AreaState>) => {
  builder.addCase(updateCountryStatus, (state, action) => {
    const { assessmentName, countryIso, cycleName, status } = action.payload

    const path = ['countries', assessmentName, cycleName, countryIso, 'props', 'status']
    Objects.setInPath({ obj: state, path, value: status })
  })
}
