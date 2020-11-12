import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import userManagement from '@webapp/app/user/userManagement/reducer'

import component from './Admin'
import { AdminReducer, AdminState } from '../../store/admin'

const reducers = [
  { name: AdminState.stateKey, fn: AdminReducer },
  { name: UserManagementState.stateKey, fn: userManagement },
]

export { component, reducers }
