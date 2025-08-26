import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { setCountry } from 'client/store/area/actions/setCountry'
import { AreaState } from 'client/store/area/state'

export const setCountryReducer = (builder: ActionReducerMapBuilder<AreaState>): void => {
  builder.addCase(setCountry, (state, action) => {
    const { assessmentName, country, cycleName } = action.payload
    const { countryIso } = country

    const path = ['countries', assessmentName, cycleName, countryIso]
    Objects.setInPath({ obj: state, path, value: country })
  })
}
