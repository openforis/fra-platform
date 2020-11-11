import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import userManagement from '@webapp/app/user/userManagement/reducer'

import * as AdminState from '../../store/admin/adminState'
import component from './Admin'
import admin from '../../store/admin/reducer'

const reducers = [
  { name: AdminState.stateKey, fn: admin },
  { name: UserManagementState.stateKey, fn: userManagement },
]

export { component, reducers }
