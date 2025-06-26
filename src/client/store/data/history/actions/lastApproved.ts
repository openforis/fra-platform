import { createAction } from '@reduxjs/toolkit'

export const toggleLastApproved = createAction<boolean | undefined>('data/history/lastApproved/toggle')
