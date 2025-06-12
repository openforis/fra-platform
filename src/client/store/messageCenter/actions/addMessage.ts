import { createAction } from '@reduxjs/toolkit'

import { Message, MessageTopic } from 'meta/messageCenter'

export const addMessage = createAction<{ message: Message; topic: MessageTopic }>('messageCenter/topic/message/add')
