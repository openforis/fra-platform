import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getExtraEstimation } from 'client/store/geo/statistics/actions/getExtraEstimation'
import { GeoStatisticsState } from 'client/store/geo/statistics/state'

export const getExtraEstimationReducer = (builder: ActionReducerMapBuilder<GeoStatisticsState>): void => {
  builder.addCase(getExtraEstimation.fulfilled, (state, action) => {
    const { entry, extraEstimation, sectionKey } = action.payload
    const estimationsTableData = state.forestEstimationsTableData ?? []
    const estimationCurrentIndex = estimationsTableData.findIndex((r) => r.sourceKey === entry.sourceKey)

    if (estimationCurrentIndex !== -1) {
      estimationsTableData[estimationCurrentIndex] = entry
    } else {
      estimationsTableData.splice(-1, 0, entry)
    }
    Objects.setInPath({ obj: state, path: ['extraEstimations', sectionKey, extraEstimation, 'errorKey'], value: null })
    Objects.setInPath({ obj: state, path: ['extraEstimations', sectionKey, extraEstimation, 'loading'], value: false })
  })
  builder.addCase(getExtraEstimation.pending, (state, { meta }) => {
    const { extraEstimation, sectionKey } = meta.arg
    Objects.setInPath({ obj: state, path: ['extraEstimations', sectionKey, extraEstimation, 'errorKey'], value: null })
    Objects.setInPath({ obj: state, path: ['extraEstimations', sectionKey, extraEstimation, 'loading'], value: true })
  })
  builder.addCase(getExtraEstimation.rejected, (state, action) => {
    const { extraEstimation, sectionKey } = action.meta.arg
    const err = action.payload
    Objects.setInPath({ obj: state, path: ['extraEstimations', sectionKey, extraEstimation, 'errorKey'], value: err })
    Objects.setInPath({ obj: state, path: ['extraEstimations', sectionKey, extraEstimation, 'loading'], value: false })
  })
}
