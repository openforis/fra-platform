import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { getIsVerificationInProgress } from 'client/store/admin/links/actions/getIsVerificationInProgress'
import { initialState, LinksState } from 'client/store/admin/links/state'

import { LinksSliceName } from './name'

export const LinksSlice = createSlice({
  name: LinksSliceName,
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
