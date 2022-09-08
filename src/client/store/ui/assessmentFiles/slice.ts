import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getFiles, upload } from './actions'
import { AssessmentFilesState } from './stateType'

const initialState: AssessmentFilesState = {
  globals: [],
}

export const assessmentFilesSlice = createSlice({
  name: 'assessmentFiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFiles.fulfilled, (state, reducer) => {
      const {
        meta: { arg },
        payload,
      } = reducer
      const { countryIso } = arg
      const countryFiles = payload.filter((f) => f.countryIso === countryIso)
      const globalFiles = payload.filter((f) => !f.countryIso)
      state[countryIso] = countryFiles
      state.globals = globalFiles
    })
  },
})

export const AssessmentFilesActions = {
  ...assessmentFilesSlice.actions,
  getFiles,
  upload,
}

export default assessmentFilesSlice.reducer as Reducer<AssessmentFilesState>
