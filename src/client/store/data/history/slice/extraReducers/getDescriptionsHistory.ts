import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getDescriptionsHistory } from 'client/store/data/history/actions/getDescriptionsHistory'
import { HistoryState } from 'client/store/data/history/state'

export const getDescriptionsHistoryReducer = (builder: ActionReducerMapBuilder<HistoryState>) =>
  builder.addCase(getDescriptionsHistory.fulfilled, (state, { meta, payload }) => {
    const { assessmentName, countryIso, cycleName } = meta.arg

    const value = payload[countryIso]
    const path = ['lastApproved', 'descriptions', assessmentName, cycleName, countryIso]
    const currentValue = Objects.getInPath(state, path) ?? {}

    Objects.setInPath({ obj: state, path, value: { ...value, ...currentValue } })
  })
