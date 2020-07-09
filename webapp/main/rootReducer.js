import applicationError from '@webapp/components/error/reducer' // Reducers available before login
import user from '@webapp/user/reducer'
import app from '@webapp/app/reducer'
import login from '@webapp/Login/reducer'

import * as AppState from '@webapp/app/appState'
import * as ApplicationErrorState from '@webapp/components/error/applicationErrorState'
import * as UserState from '@webapp/user/userState'

export default {
  [ApplicationErrorState.stateKey]: applicationError,
  [AppState.stateKey]: app,
  login,
  [UserState.stateKey]: user,
}
