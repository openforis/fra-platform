import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getDescriptionsHistory } from 'client/store/data/actions/getDescriptionsHistory'
import { DataState } from 'client/store/data/state'

export const getDescriptionsHistoryReducer = (builder: ActionReducerMapBuilder<DataState>) =>
  builder.addCase(getDescriptionsHistory.fulfilled, (state, { meta, payload }) => {
    const { assessmentName, countryIso, cycleName } = meta.arg

    const value = payload[countryIso]
    const path = ['history', 'lastApproved', 'descriptions', assessmentName, cycleName, countryIso]
    const currentValue = Objects.getInPath(state, path) ?? {}

    Objects.setInPath({ obj: state, path, value: { ...value, ...currentValue } })
  })
