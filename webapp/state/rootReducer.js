import applicationError from '@webapp/loggedin/applicationError/reducer'// Reducers available before login
import login from '../login/reducer'
import user from '@webapp/user/reducer'
import app from '@webapp/app/reducer'

import * as AppState from '@webapp/app/appState'

export default {
  applicationError,
  [AppState.stateKey]: app,
  login,
  user
}
