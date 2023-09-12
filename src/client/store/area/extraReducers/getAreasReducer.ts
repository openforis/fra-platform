import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getAreas } from 'client/store/area/actions/getAreas'
import { AreaState } from 'client/store/area/state'

export const getAreasReducer = (builder: ActionReducerMapBuilder<AreaState>) => {
  builder.addCase(getAreas.fulfilled, (state, { payload, meta }) => {
    const { assessmentName, cycleName } = meta.arg
    const { countries, regionGroups } = payload

    const pathCountry = ['countries', assessmentName, cycleName]
    const pathRegionGroup = ['regionGroups', assessmentName, cycleName]

    Objects.setInPath({
      obj: state,
      path: pathCountry,
      value: countries.reduce((countriesAcc, country) => ({ ...countriesAcc, [country.countryIso]: country }), {}),
    })

    Objects.setInPath({ obj: state, path: pathRegionGroup, value: regionGroups })
  })
}
