import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/RootState'
import { FileUploadSlice } from 'client/store/ui/fileUpload'

const _getState = (state: RootState) => state.ui[FileUploadSlice.name]
const isLoading = createSelector(_getState, (fileUpload) => fileUpload.loading)
const getFiles = createSelector(_getState, (fileUpload) => fileUpload.files)
const getProgress = createSelector(_getState, (fileUpload) => fileUpload.progress)

export const FileUploadSelectors = {
  isLoading,
  getFiles,
  getProgress,
}
