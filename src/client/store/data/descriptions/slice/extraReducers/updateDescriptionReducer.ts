import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { setDescription } from 'client/store/data/descriptions/actions/setDescription'
import { updateDescription } from 'client/store/data/descriptions/actions/updateDescription'
import { DescriptionsState } from 'client/store/data/descriptions/state'

export const updateDescriptionReducer = (builder: ActionReducerMapBuilder<DescriptionsState>): void => {
  builder.addCase(updateDescription.pending, (state, { meta }) => {
    const { assessmentName, countryIso, cycleName, name, sectionName, value } = meta.arg

    const path = [assessmentName, cycleName, countryIso, sectionName, name]
    Objects.setInPath({ obj: state, path, value })
  })

  builder.addCase(setDescription, (state, { payload }) => {
    const { assessmentName, countryIso, cycleName, name, sectionName, value } = payload

    const path = [assessmentName, cycleName, countryIso, sectionName, name]
    Objects.setInPath({ obj: state, path, value })
  })
}
