import { createAction } from '@reduxjs/toolkit'

import { FileSummary } from 'meta/file'

export const setFile = createAction<FileSummary | undefined>('repository/file/set')
