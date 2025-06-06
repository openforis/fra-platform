import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getDescription } from 'client/store/data/descriptions/actions/getDescription'
import { DescriptionsState } from 'client/store/data/descriptions/state'

export const getDescriptionReducer = (builder: ActionReducerMapBuilder<DescriptionsState>) => {
  builder.addCase(getDescription.fulfilled, (state, { meta, payload }) => {
    const { assessmentName, countryIso, cycleName } = meta.arg

    const valuePayload = payload[countryIso]
    const valueStore = state[assessmentName]?.[cycleName]?.[countryIso]
    const path = [assessmentName, cycleName, countryIso]
    Objects.setInPath({ obj: state, path, value: { ...valueStore, ...valuePayload } })
  })
}
