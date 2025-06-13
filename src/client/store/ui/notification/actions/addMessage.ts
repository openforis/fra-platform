import { createAction } from '@reduxjs/toolkit'

import { NotificationMessage } from 'client/store/ui/notification/state'

export const addMessage = createAction<NotificationMessage>('ui/notification/add')
