import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area/areas'

import { getDashboard } from 'client/store/meta/actions/getDashboard'
import { DashboardAreaType, MetaState } from 'client/store/meta/state'

export const getDashboardReducer = (builder: ActionReducerMapBuilder<MetaState>): void => {
  builder.addCase(getDashboard.fulfilled, (state, action) => {
    const { assessmentName, countryIso, cycleName } = action.meta.arg
    const key = Areas.isISOCountry(countryIso) ? DashboardAreaType.Country : DashboardAreaType.Region

    Objects.setInPath({ obj: state.dashboard, path: [assessmentName, cycleName, key], value: action.payload })
  })
}
