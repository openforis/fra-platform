import { createSlice, isAnyOf, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { ODPReservedYear } from 'meta/assessment'

import { getOriginalDataPointReservedYears } from 'client/store/ui/originalDataPoint/actions/getOriginalDataPointReservedYears'
import { setUpdatingTrue } from 'client/store/ui/originalDataPoint/reducers/setUpdatingTrue'

import { copyPreviousNationalClasses } from './actions/copyPreviousNationalClasses'
import { createOriginalDataPoint } from './actions/createOriginalDataPoint'
import { deleteOriginalDataPoint } from './actions/deleteOriginalDataPoint'
import { getOriginalDataPoint } from './actions/getOriginalDataPoint'
import { pasteNationalClass } from './actions/pasteNationalClass'
import { updateNationalClass } from './actions/updateNationalClass'
import { updateOriginalDataPoint } from './actions/updateOriginalDataPoint'
import { updateOriginalDataPointDataSources } from './actions/updateOriginalDataPointDataSources'
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
        getOriginalDataPoint.fulfilled,
        updateOriginalDataPoint.fulfilled,
        updateOriginalDataPointDataSources.fulfilled,
        updateOriginalDataPointNationalClasses.fulfilled,
        updateOriginalDataPointOriginalData.fulfilled,
        createOriginalDataPoint.fulfilled
      ),
      setOriginalDataPoint
    )

    builder.addMatcher(
      isAnyOf(
        updateOriginalDataPoint.pending,
        updateOriginalDataPointDataSources.pending,
        updateOriginalDataPointNationalClasses.pending,
        updateOriginalDataPointOriginalData.pending
      ),
      setUpdatingTrue
    )
  },
})

export const OriginalDataPointActions = {
  ...originalDataPointSlice.actions,
  getOriginalDataPoint,
  pasteNationalClass,
  updateNationalClass,
  createOriginalDataPoint,
  deleteOriginalDataPoint,
  updateOriginalDataPoint,
  updateOriginalDataPointDataSources,
  updateOriginalDataPointNationalClasses,
  updateOriginalDataPointOriginalData,
  copyPreviousNationalClasses,
  getOriginalDataPointReservedYears,
}

export default originalDataPointSlice.reducer as Reducer<OriginalDataPointState>
