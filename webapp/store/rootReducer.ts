import applicationError from '@webapp/components/error/reducer' // Reducers available before login
import { UserReducer, UserState } from '@webapp/store/user'
import AppState from '@webapp/store/app/app.slice'
import login from '@webapp/pages/Login/reducer'
// import countryState from '@webapp/app/country/reducer'
import { pageReducer } from '@webapp/store/page'

import * as ApplicationErrorState from '@webapp/components/error/applicationErrorState'

export default {
  app: AppState,

  // Old
  [ApplicationErrorState.stateKey]: applicationError,
  login,
  [UserState.stateKey]: UserReducer,
  // Uncaught ReferenceError: can't access lexical declaration 'g' before initialization
  // country: countryState,
  page: pageReducer,
}
