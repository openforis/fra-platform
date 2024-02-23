import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { uploadFilesReducer } from 'client/store/ui/fileUpload/reducers/uploadFilesReducer'
import { FileUploadProgress, FileUploadState, initialState } from 'client/store/ui/fileUpload/state'

export const FileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<FileUploadProgress>) => {
      state.progress = action.payload
    },
  },
  extraReducers: (builder) => {
    uploadFilesReducer(builder)
  },
})

export default FileUploadSlice.reducer as Reducer<FileUploadState>
