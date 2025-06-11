import { ActionReducerMapBuilder, isAnyOf, isFulfilled, isRejected } from '@reduxjs/toolkit'

import { FileUploadActions } from 'client/store/fileUpload/actions'
import { FileUploadState } from 'client/store/fileUpload/state'

export const uploadFilesReducer = (builder: ActionReducerMapBuilder<FileUploadState>) => {
  builder.addCase(FileUploadActions.uploadFiles.pending, (state) => {
    state.loading = true
    state.progress = { loaded: 0, total: 100 }
  })

  builder.addMatcher(
    isAnyOf(isFulfilled(FileUploadActions.uploadFiles), isRejected(FileUploadActions.uploadFiles)),
    (state) => {
      state.loading = false
      state.progress = undefined
    }
  )
}
