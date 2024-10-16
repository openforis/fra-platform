import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'

import { getDashboard } from 'client/store/metadata/actions/getDashboard'
import { DashboardAreaType, MetadataState } from 'client/store/metadata/state'

export const getDashboardReducer = (builder: ActionReducerMapBuilder<MetadataState>): void => {
  builder.addCase(getDashboard.fulfilled, (state, action) => {
    const { assessmentName, cycleName, countryIso } = action.meta.arg
    const key = Areas.isISOCountry(countryIso) ? DashboardAreaType.Country : DashboardAreaType.Region

    Objects.setInPath({ obj: state.dashboard, path: [assessmentName, cycleName, key], value: action.payload })
  })
}
