import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { deleteDataSource } from 'client/store/data/descriptions/actions/deleteDataSource'
import { DescriptionsState } from 'client/store/data/descriptions/state'

export const deleteDataSourceReducer = (builder: ActionReducerMapBuilder<DescriptionsState>) => {
  builder.addCase(deleteDataSource.pending, (state, action) => {
    const { assessmentName, countryIso, cycleName, sectionName, uuid } = action.meta.arg

    const name = CommentableDescriptionName.dataSources
    const value = state[assessmentName]?.[cycleName]?.[countryIso]?.[sectionName]?.[name]
    if (!value) {
      throw new Error(`Unable to find data source value ${assessmentName}-${cycleName}-${countryIso}-${sectionName}}`)
    }
    const dataSources = value.dataSources.filter((d) => d.uuid !== uuid)
    const valueUpdate = { ...value, dataSources }

    const path = [assessmentName, cycleName, countryIso, sectionName, name]
    Objects.setInPath({ obj: state, path, value: valueUpdate })
  })
}
