import { createAction } from '@reduxjs/toolkit'

import { MessageTopic, MessageTopicStatus } from 'meta/messageCenter'

export const changeStatus = createAction<{ status: MessageTopicStatus; topic: MessageTopic }>(
  'messageCenter/topic/status/change'
)
