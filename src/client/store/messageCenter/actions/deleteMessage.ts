import { createAction } from '@reduxjs/toolkit'

export const deleteMessage = createAction<{ messageId: number; topicKey: string }>('messageCenter/topic/message/delete')
