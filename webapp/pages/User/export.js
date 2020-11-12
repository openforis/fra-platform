import * as UserState from '@webapp/store/user/userState'
import user from '@webapp/store/user/reducer'

import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import userManagement from '@webapp/app/user/userManagement/reducer'

import component from './User'

const reducers = [
  { name: UserState.stateKey, fn: user },
  { name: UserManagementState.stateKey, fn: userManagement },
]

export { component, reducers }
