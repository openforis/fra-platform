import { createSlice, isAnyOf, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { ODPReservedYear } from 'meta/assessment'

import { copyNationalClasses } from 'client/store/ui/originalDataPoint/actions/copyNationalClasses'
import { getOriginalDataPointReservedYears } from 'client/store/ui/originalDataPoint/actions/getOriginalDataPointReservedYears'
import { setUpdatingTrue } from 'client/store/ui/originalDataPoint/reducers/setUpdatingTrue'

import { createOriginalDataPoint } from './actions/createOriginalDataPoint'
import { deleteOriginalDataPoint } from './actions/deleteOriginalDataPoint'
import { deleteOriginalDataPointNationalClass } from './actions/deleteOriginalDataPointNationalClass'
import { getOriginalDataPoint } from './actions/getOriginalDataPoint'
import { updateOriginalDataPointDataSources } from './actions/updateOriginalDataPointDataSources'
import { updateOriginalDataPointDescription } from './actions/updateOriginalDataPointDescription'
import { updateOriginalDataPointNationalClasses } from './actions/updateOriginalDataPointNationalClasses'
import { updateOriginalDataPointOriginalData } from './actions/updateOriginalDataPointOriginalData'
import { setOriginalDataPoint } from './reducers/setOriginalDataPoint'
import { OriginalDataPointState } from './stateType'

const initialState: OriginalDataPointState = { data: null, reservedYears: null }
export const originalDataPointSlice = createSlice({
  name: 'originalDataPoint',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      getOriginalDataPointReservedYears.fulfilled,
      (state, { payload }: PayloadAction<Array<ODPReservedYear>>) => {
        state.reservedYears = payload
      }
    )

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
        createOriginalDataPoint.fulfilled
      ),
      setOriginalDataPoint
    )

    builder.addMatcher(
      isAnyOf(
        copyNationalClasses.pending,
        deleteOriginalDataPointNationalClass.pending,
        updateOriginalDataPointDataSources.pending,
        updateOriginalDataPointNationalClasses.pending,
        updateOriginalDataPointDescription.pending,
        updateOriginalDataPointOriginalData.pending
      ),
      setUpdatingTrue
    )
  },
})

export const OriginalDataPointActions = {
  ...originalDataPointSlice.actions,
  getOriginalDataPoint,
  createOriginalDataPoint,
  deleteOriginalDataPoint,
  deleteOriginalDataPointNationalClass,
  updateOriginalDataPointDataSources,
  updateOriginalDataPointDescription,
  updateOriginalDataPointNationalClasses,
  updateOriginalDataPointOriginalData,
  copyNationalClasses,
  getOriginalDataPointReservedYears,
}

export default originalDataPointSlice.reducer as Reducer<OriginalDataPointState>
