import { ActionReducerMapBuilder, Draft, isAnyOf } from '@reduxjs/toolkit'

import { copyNationalClasses } from 'client/store/data/originalDataPoint/actions/copyNationalClasses'
import { deleteOriginalDataPointNationalClass } from 'client/store/data/originalDataPoint/actions/deleteOriginalDataPointNationalClass'
import { updateOriginalDataPointDataSources } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointDataSources'
import { updateOriginalDataPointDescription } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointDescription'
import { updateOriginalDataPointNationalClasses } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointNationalClasses'
import { updateOriginalDataPointOriginalData } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointOriginalData'
import { updateOriginalDataPointYear } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointYear'
import { OriginalDataPointState } from 'client/store/data/originalDataPoint/state'

export const setUpdatingReducer = (builder: ActionReducerMapBuilder<OriginalDataPointState>) => {
  builder.addMatcher(
    isAnyOf(
      copyNationalClasses.pending,
      deleteOriginalDataPointNationalClass.pending,
      updateOriginalDataPointDataSources.pending,
      updateOriginalDataPointNationalClasses.pending,
      updateOriginalDataPointDescription.pending,
      updateOriginalDataPointOriginalData.pending,
      updateOriginalDataPointYear.pending
    ),
    (state: Draft<OriginalDataPointState>) => {
      state.updating = true
    }
  )
}
