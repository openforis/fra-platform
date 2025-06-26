import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/types'

const _getState = (state: RootState) => state.fileUpload
const isLoading = createSelector(_getState, (fileUpload) => fileUpload.loading)
const getProgress = createSelector(_getState, (fileUpload) => fileUpload.progress)

export const FileUploadSelectors = {
  isLoading,
  getProgress,
}
