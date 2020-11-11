import * as UserState from '@webapp/store/user/userState'
import user from '@webapp/store/user/reducer'

import component from './User'

const reducers = [{ name: UserState.stateKey, fn: user }]

export { component, reducers }
