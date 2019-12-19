import applicationError from '../applicationError/reducer'// Reducers available before login
import login from '../login/reducer'
import user from '../user/reducer'
import app from '../app/reducer'

import * as AppState from '../app/appState'

export default {
  applicationError,
  [AppState.stateKey]: app,
  login,
  user
}
