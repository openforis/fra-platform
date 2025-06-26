import { createAction } from '@reduxjs/toolkit'

import { FileUploadProgress } from 'client/store/fileUpload/state'

export const setProgress = createAction<FileUploadProgress>('fileUpload/prgress/set')
