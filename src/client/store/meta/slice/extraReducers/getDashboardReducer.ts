import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Areas } from 'meta/area/areas'
import { Objects } from 'utils/objects'

import { getDashboard } from 'client/store/meta/actions/getDashboard'
import { DashboardAreaType, MetaState } from 'client/store/meta/state'

export const getDashboardReducer = (builder: ActionReducerMapBuilder<MetaState>): void => {
  builder.addCase(getDashboard.fulfilled, (state, action) => {
    const { areaCode, assessmentName, cycleName } = action.meta.arg
    const key = Areas.isISOCountry(areaCode) ? DashboardAreaType.Country : DashboardAreaType.Region

    Objects.setInPath({ obj: state.dashboard, path: [assessmentName, cycleName, key], value: action.payload })
  })
}
