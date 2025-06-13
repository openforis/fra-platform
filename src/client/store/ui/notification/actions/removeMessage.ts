import { createAction } from '@reduxjs/toolkit'

import { NotificationMessage } from 'client/store/ui/notification/state'

export const removeMessage = createAction<NotificationMessage['id']>('ui/notification/remove')
