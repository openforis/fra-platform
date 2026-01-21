import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'

import { getIsVerificationInProgress } from 'client/store/links/actions/getIsVerificationInProgress'
import { getLinksVerificationKey, initialState, LinksState } from 'client/store/links/state'

import { LinksSliceName } from './name'

export const LinksSlice = createSlice({
  name: LinksSliceName,
  initialState,
  reducers: {
    reset: () => initialState,
    setIsVerificationInProgress: (
      state: LinksState,
      action: PayloadAction<{
        assessmentName: AssessmentName
        countryIso?: CountryIso
        cycleName: CycleName
        isVerificationInProgress: boolean
      }>
    ) => {
      const { assessmentName, countryIso, cycleName, isVerificationInProgress } = action.payload
      const countryKey = getLinksVerificationKey(countryIso)
      Objects.setInPath({
        obj: state,
        path: ['isVerificationInProgress', assessmentName, cycleName, countryKey],
        value: isVerificationInProgress,
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIsVerificationInProgress.fulfilled, (state, { meta, payload }) => {
      const { assessmentName, countryIso, cycleName } = meta.arg
      const countryKey = getLinksVerificationKey(countryIso)
      Objects.setInPath({
        obj: state,
        path: ['isVerificationInProgress', assessmentName, cycleName, countryKey],
        value: payload,
      })
    })
  },
})
