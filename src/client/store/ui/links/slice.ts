import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { AssessmentName, CycleName } from 'meta/assessment'

import { getIsVerificationInProgress } from './actions/getIsVerificationInProgress'
import { initialState, LinksState } from './state'

export const LinksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    reset: () => initialState,
    setIsVerificationInProgress: (
      state: LinksState,
      action: PayloadAction<{ assessmentName: AssessmentName; cycleName: CycleName; isVerificationInProgress: boolean }>
    ) => {
      const { assessmentName, cycleName, isVerificationInProgress } = action.payload
      Objects.setInPath({
        obj: state,
        path: ['isVerificationInProgress', assessmentName, cycleName],
        value: isVerificationInProgress,
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIsVerificationInProgress.fulfilled, (state, { meta, payload }) => {
      const { assessmentName, cycleName } = meta.arg
      Objects.setInPath({
        obj: state,
        path: ['isVerificationInProgress', assessmentName, cycleName],
        value: payload,
      })
    })
  },
})

export default LinksSlice.reducer as Reducer<LinksState>
