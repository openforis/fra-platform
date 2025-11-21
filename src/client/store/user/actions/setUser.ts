import { createAction } from '@reduxjs/toolkit'

import { User } from 'meta/user/user'

export const setUser = createAction<User>('user/set')
