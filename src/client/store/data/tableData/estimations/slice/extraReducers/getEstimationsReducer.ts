import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getNodeValuesEstimations } from 'client/store/data/tableData/estimations/actions/getNodeValuesEstimations'
import { EstimationsState } from 'client/store/data/tableData/estimations/state'

export const getEstimationsReducer = (builder: ActionReducerMapBuilder<EstimationsState>) => {
  builder.addCase(getNodeValuesEstimations.fulfilled, (state, { meta, payload }) => {
    const { assessmentName, countryIso, cycleName } = meta.arg

    const path = [assessmentName, cycleName, countryIso]
    const curr = Objects.getInPath(state, path)

    Objects.setInPath({ obj: state, path, value: { ...payload, ...curr } })
  })
}
