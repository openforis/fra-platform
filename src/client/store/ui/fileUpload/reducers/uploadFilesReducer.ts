import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { uploadFiles } from 'client/store/ui/fileUpload/actions/uploadFiles'
import { FileUploadState } from 'client/store/ui/fileUpload/state'

export const uploadFilesReducer = (builder: ActionReducerMapBuilder<FileUploadState>) => {
  builder.addCase(uploadFiles.pending, (state) => {
    state.loading = true
  })

  builder.addCase(uploadFiles.fulfilled, (state, action) => {
    state.loading = false
    state.files = action.payload
  })

  builder.addCase(uploadFiles.rejected, (state) => {
    state.loading = false
  })
}
