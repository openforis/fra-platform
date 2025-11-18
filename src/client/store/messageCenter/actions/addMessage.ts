import { createAction } from '@reduxjs/toolkit'

import { Message } from 'meta/messageCenter/message'
import { MessageTopic } from 'meta/messageCenter/messageTopic'

export const addMessage = createAction<{ message: Message; topic: MessageTopic }>('messageCenter/topic/message/add')
