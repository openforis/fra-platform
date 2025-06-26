import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { setProgress } from 'client/store/fileUpload/actions/setProgress'
import { FileUploadState } from 'client/store/fileUpload/state'

export const setProgressReducer = (builder: ActionReducerMapBuilder<FileUploadState>) => {
  builder.addCase(setProgress, (state, action) => {
    state.progress = action.payload
  })
}
