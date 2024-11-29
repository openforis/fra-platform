import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { Dashboards } from 'meta/dashboard'

import { getDashboard } from 'client/store/metadata/actions/getDashboard'
import { MetadataState } from 'client/store/metadata/state'

export const getDashboardReducer = (builder: ActionReducerMapBuilder<MetadataState>): void => {
  builder
    .addCase(getDashboard.pending, (state, action) => {
      const { assessmentName, cycleName, countryIso } = action.meta.arg
      const key = Dashboards.getAreaType(countryIso)

      Objects.setInPath({
        obj: state.dashboard,
        path: [assessmentName, cycleName, key, 'loaded'],
        value: false,
      })
    })
    .addCase(getDashboard.fulfilled, (state, action) => {
      const { assessmentName, cycleName, countryIso } = action.meta.arg
      const key = Dashboards.getAreaType(countryIso)

      const value = { items: action.payload, loaded: true }
      Objects.setInPath({ obj: state.dashboard, path: [assessmentName, cycleName, key], value })
    })
}
