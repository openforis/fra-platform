import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import userManagement from '@webapp/app/user/userManagement/reducer'

import component from './Admin'

const reducers = [{ name: UserManagementState.stateKey, fn: userManagement }]

export { component, reducers }
