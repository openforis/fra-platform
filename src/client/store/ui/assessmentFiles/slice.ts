import { createSlice, Reducer } from '@reduxjs/toolkit'

import { upload } from './actions'
import { AssessmentFilesState } from './stateType'

const initialState: AssessmentFilesState = {
  globals: [],
}

export const assessmentFilesSlice = createSlice({
  name: 'assessmentFiles',
  initialState,
  reducers: {},
})

export const AssessmentFilesActions = {
  ...assessmentFilesSlice.actions,
  upload,
}

export default assessmentFilesSlice.reducer as Reducer<AssessmentFilesState>
