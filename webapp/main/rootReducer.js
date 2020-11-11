import applicationError from '@webapp/components/error/reducer' // Reducers available before login
import user from '@webapp/store/user/reducer'
import app from '@webapp/app/reducer'
import login from '@webapp/pages/Login/reducer'
import country from '@webapp/app/country/reducer'

import * as AppState from '@webapp/app/appState'
import * as ApplicationErrorState from '@webapp/components/error/applicationErrorState'
import * as UserState from '@webapp/store/user/userState'
import * as CountryState from '@webapp/app/country/countryState'

export default {
  [ApplicationErrorState.stateKey]: applicationError,
  [AppState.stateKey]: app,
  login,
  [UserState.stateKey]: user,
  [CountryState.stateKey]: country,
}
