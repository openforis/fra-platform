import { createSlice, Reducer } from '@reduxjs/toolkit'

import { uploadFilesReducer } from 'client/store/ui/fileUpload/reducers/uploadFilesReducer'
import { FileUploadState, initialState } from 'client/store/ui/fileUpload/state'

export const FileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    uploadFilesReducer(builder)
  },
})

export default FileUploadSlice.reducer as Reducer<FileUploadState>
