import * as UserManagementState from '../../app/user/userManagement/userManagementState'
import userManagement from '../../app/user/userManagement/reducer'

import component from './Admin'

const reducers = [{ name: UserManagementState.stateKey, fn: userManagement }]

export { component, reducers }
