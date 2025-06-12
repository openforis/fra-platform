import { createAction } from '@reduxjs/toolkit'

export const closeTopic = createAction<{ key: string }>('messageCenter/topic/close')
