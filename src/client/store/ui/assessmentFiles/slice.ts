import { createSlice, Reducer } from '@reduxjs/toolkit'

import { setFileLoadingReducer } from 'client/store/ui/assessmentFiles/reducers/setFileLoading'

import { deleteFile, getFiles, upload } from './actions'
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

    builder.addCase(deleteFile.fulfilled, (state, reducer) => {
      const {
        meta: { arg },
      } = reducer
      const { fileCountryIso, uuid } = arg
      if (fileCountryIso) state[fileCountryIso] = state[fileCountryIso].filter((f) => f.uuid !== uuid)
      else state.globals = state.globals.filter((f) => f.uuid !== uuid)
    })

    builder.addCase(upload.fulfilled, (state, reducer) => {
      const {
        meta: { arg },
        payload,
      } = reducer
      const { fileCountryIso } = arg
      if (fileCountryIso) state[fileCountryIso].push(payload)
      else state.globals.push(payload)
    })
    setFileLoadingReducer(builder)
  },
})

export const AssessmentFilesActions = {
  ...assessmentFilesSlice.actions,
  deleteFile,
  getFiles,
  upload,
}

export default assessmentFilesSlice.reducer as Reducer<AssessmentFilesState>
