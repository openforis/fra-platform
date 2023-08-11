import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { updateCountryProp } from 'client/store/area/actions/updateCountryProp'
import { AreaState } from 'client/store/area/state'

export const updateCountryPropReducer = (builder: ActionReducerMapBuilder<AreaState>) => {
  builder.addCase(updateCountryProp.pending, (state, action) => {
    const { assessmentName, countryIso, countryProp, cycleName } = action.meta.arg

    const path = ['countries', assessmentName, cycleName, countryIso, 'props']
    const value = {
      ...state.countries[assessmentName][cycleName][countryIso].props,
      ...countryProp,
    }
    Objects.setInPath({
      obj: state,
      path,
      value,
    })
  })
}
