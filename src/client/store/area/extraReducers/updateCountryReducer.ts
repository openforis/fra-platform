import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { updateCountry } from 'client/store/area/actions/updateCountry'
import { AreaState } from 'client/store/area/state'

export const updateCountryReducer = (builder: ActionReducerMapBuilder<AreaState>) => {
  builder.addCase(updateCountry.fulfilled, (state, { payload, meta }) => {
    const { assessmentName, cycleName, countryIso } = meta.arg

    Objects.setInPath({
      obj: state,
      path: ['countries', assessmentName, cycleName, countryIso],
      value: { ...state.countries[assessmentName][cycleName][countryIso], ...payload },
    })
  })
}
