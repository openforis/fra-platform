import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { postEstimate } from 'client/store/data/tableData/estimations/actions/postEstimate'
import { EstimationsState } from 'client/store/data/tableData/estimations/state'

export const postEstimationsReducer = (builder: ActionReducerMapBuilder<EstimationsState>) => {
  builder.addCase(postEstimate.fulfilled, (state, { meta, payload }) => {
    const { assessmentName, countryIso, cycleName } = meta.arg

    const path = [assessmentName, cycleName, countryIso]
    Objects.setInPath({ obj: state, path, value: payload.nodeValueEstimations })
  })
}
