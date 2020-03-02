import applicationError from '@webapp/app/components/error/reducer'// Reducers available before login
import login from '../login/reducer'
import user from '@webapp/user/reducer'
import app from '@webapp/app/reducer'

import * as AppState from '@webapp/app/appState'
import * as ApplicationErrorState from '@webapp/app/components/error/applicationErrorState'
import * as UserState from '@webapp/user/userState'

export default {
  [ApplicationErrorState.stateKey]: applicationError,
  [AppState.stateKey]: app,
  login,
  [UserState.stateKey]: user,
}
