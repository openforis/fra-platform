import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getData } from 'client/store/explorer/data/actions/getData'
import { ExplorerDataState } from 'client/store/explorer/data/state'

export const getDataReducer = (builder: ActionReducerMapBuilder<ExplorerDataState>) => {
  builder.addCase(getData.fulfilled, (state, { meta, payload }) => {
    const { sectionName } = meta.arg

    const path = [sectionName]
    Objects.setInPath({ obj: state, path, value: payload })
  })
}
