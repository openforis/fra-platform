import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { updateCountryProp } from 'client/store/area/actions/updateCountryProp'
import { AreaState } from 'client/store/area/state'

export const updateCountryPropReducer = (builder: ActionReducerMapBuilder<AreaState>) => {
  builder.addCase(updateCountryProp.pending, (state, reducer) => {
    const {
      meta: { arg },
    } = reducer

    const { assessmentName, countryIso, countryProp, cycleName } = arg

    Objects.setInPath({
      obj: state,
      path: ['countries', assessmentName, cycleName, countryIso, 'props'],
      value: {
        ...state.countries[assessmentName][cycleName][countryIso].props,
        ...countryProp,
      },
    })
  })
}
