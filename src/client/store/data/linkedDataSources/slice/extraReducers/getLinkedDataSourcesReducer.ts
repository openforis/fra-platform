import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getLinkedDataSources } from 'client/store/data/linkedDataSources/actions/getLinkedDataSources'
import { LinkedDataSourcesState } from 'client/store/data/linkedDataSources/state'

export const getLinkedDataSourcesReducer = (builder: ActionReducerMapBuilder<LinkedDataSourcesState>) => {
  builder.addCase(getLinkedDataSources.fulfilled, (state, { meta, payload }) => {
    const { dataSources, sectionName } = payload
    const { assessmentName, countryIso, cycleName } = meta.arg

    const path = [assessmentName, cycleName, countryIso, sectionName]
    Objects.setInPath({ obj: state, path, value: dataSources })
  })
}
