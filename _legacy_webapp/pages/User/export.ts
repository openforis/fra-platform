import { UserReducer } from '../../store/user'

import * as UserManagementState from '../../app/user/userManagement/userManagementState'
import userManagement from '../../app/user/userManagement/reducer'

import component from './User'

const reducers = [
  { name: 'user', fn: UserReducer },
  { name: UserManagementState.stateKey, fn: userManagement },
]

export { component, reducers }
