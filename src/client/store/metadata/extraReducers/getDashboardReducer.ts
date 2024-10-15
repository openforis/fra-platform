import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Areas } from 'meta/area'

import { getDashboard } from 'client/store/metadata/actions/getDashboard'
import { MetadataState } from 'client/store/metadata/state'

export const getDashboardReducer = (builder: ActionReducerMapBuilder<MetadataState>): void => {
  builder.addCase(getDashboard.fulfilled, (state, action) => {
    const { assessmentName, cycleName, countryIso } = action.meta.arg
    if (!state.dashboard[assessmentName]) {
      state.dashboard[assessmentName] = {}
    }

    if (!state.dashboard[assessmentName][cycleName]) {
      state.dashboard[assessmentName][cycleName] = { region: undefined, country: undefined }
    }

    const key = Areas.isISOCountry(countryIso) ? 'country' : 'region'

    state.dashboard[assessmentName][cycleName][key] = action.payload
  })
}
