import { ActionReducerMapBuilder, isAnyOf, isFulfilled, isRejected } from '@reduxjs/toolkit'

import { uploadFiles } from 'client/store/ui/fileUpload/actions/uploadFiles'
import { FileUploadState } from 'client/store/ui/fileUpload/state'

export const uploadFilesReducer = (builder: ActionReducerMapBuilder<FileUploadState>) => {
  builder.addCase(uploadFiles.pending, (state) => {
    state.loading = true
    state.progress = { loaded: 0, total: 100 }
  })

  builder.addMatcher(isAnyOf(isFulfilled(uploadFiles), isRejected(uploadFiles)), (state) => {
    state.loading = false
    state.progress = undefined
  })
}
