import { UserState, UserReducer } from '@webapp/store/user'

import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import userManagement from '@webapp/app/user/userManagement/reducer'

import * as component from './User'

const reducers = [
  { name: UserState.stateKey, fn: UserReducer },
  { name: UserManagementState.stateKey, fn: userManagement },
]

export { component, reducers }
