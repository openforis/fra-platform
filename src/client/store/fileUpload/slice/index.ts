import { createSlice } from '@reduxjs/toolkit'

import { setProgressReducer } from 'client/store/fileUpload/slice/extraReducers/setProgressReducer'
import { uploadFilesReducer } from 'client/store/fileUpload/slice/extraReducers/uploadFilesReducer'
import { initialState } from 'client/store/fileUpload/state'

import { FileUploadSliceName } from './name'

export const FileUploadSlice = createSlice({
  name: FileUploadSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setProgressReducer(builder)
    uploadFilesReducer(builder)
  },
})
