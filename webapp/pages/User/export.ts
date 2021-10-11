import { UserReducer } from '@webapp/store/user'

import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import userManagement from '@webapp/app/user/userManagement/reducer'

import component from './User'

const reducers = [
  { name: 'user', fn: UserReducer },
  { name: UserManagementState.stateKey, fn: userManagement },
]

export { component, reducers }
