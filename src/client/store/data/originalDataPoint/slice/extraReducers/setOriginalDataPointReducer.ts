import { ActionReducerMapBuilder, Draft, isAnyOf } from '@reduxjs/toolkit'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { copyNationalClasses } from 'client/store/data/originalDataPoint/actions/copyNationalClasses'
import { createOriginalDataPoint } from 'client/store/data/originalDataPoint/actions/createOriginalDataPoint'
import { deleteOriginalDataPointNationalClass } from 'client/store/data/originalDataPoint/actions/deleteOriginalDataPointNationalClass'
import { getOriginalDataPoint } from 'client/store/data/originalDataPoint/actions/getOriginalDataPoint'
import { updateOriginalDataPointDataSources } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointDataSources'
import { updateOriginalDataPointDescription } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointDescription'
import { updateOriginalDataPointNationalClasses } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointNationalClasses'
import { updateOriginalDataPointOriginalData } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointOriginalData'
import { updateOriginalDataPointYear } from 'client/store/data/originalDataPoint/actions/updateOriginalDataPointYear'
import { OriginalDataPointState } from 'client/store/data/originalDataPoint/state'

export const setOriginalDataPointReducer = (builder: ActionReducerMapBuilder<OriginalDataPointState>) => {
  builder.addMatcher(
    isAnyOf(
      createOriginalDataPoint.fulfilled,
      copyNationalClasses.fulfilled,
      deleteOriginalDataPointNationalClass.fulfilled,
      getOriginalDataPoint.fulfilled,
      updateOriginalDataPointDataSources.fulfilled,
      updateOriginalDataPointNationalClasses.fulfilled,
      updateOriginalDataPointDescription.fulfilled,
      updateOriginalDataPointOriginalData.fulfilled,
      updateOriginalDataPointYear.fulfilled,
      createOriginalDataPoint.fulfilled
    ),
    (state: Draft<OriginalDataPointState>, { payload }: { payload: OriginalDataPoint }) => {
      state.data = payload
      state.updating = false
    }
  )
}
