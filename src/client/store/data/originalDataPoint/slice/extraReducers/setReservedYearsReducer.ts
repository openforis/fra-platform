import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit'

import { ODPReservedYear } from 'meta/assessment/originalDataPoint'

import { getOriginalDataPointReservedYears } from 'client/store/data/originalDataPoint/actions/getOriginalDataPointReservedYears'
import { setReservedYears } from 'client/store/data/originalDataPoint/actions/setReservedYears'
import { OriginalDataPointState } from 'client/store/data/originalDataPoint/state'

export const setReservedYearsReducer = (builder: ActionReducerMapBuilder<OriginalDataPointState>) => {
  builder.addCase(setReservedYears, (state, { payload }: PayloadAction<Array<ODPReservedYear>>) => {
    state.reservedYears = payload
  })

  builder.addCase(
    getOriginalDataPointReservedYears.fulfilled,
    (state, { payload }: PayloadAction<Array<ODPReservedYear>>) => {
      state.reservedYears = payload
    }
  )
}
