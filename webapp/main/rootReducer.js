import applicationError from '@webapp/components/error/reducer' // Reducers available before login
import { UserReducer, UserState } from '@webapp/store/user'
import app from '@webapp/app/reducer'
import ui from '@webapp/store/ui/reducer'
import login from '@webapp/pages/Login/reducer'
import country from '@webapp/app/country/reducer'

import * as AppState from '@webapp/app/appState'
import * as ApplicationErrorState from '@webapp/components/error/applicationErrorState'
import * as CountryState from '@webapp/app/country/countryState'
import * as UiState from '@webapp/store/ui/state'

export default {
  [ApplicationErrorState.stateKey]: applicationError,
  [AppState.stateKey]: app,
  login,
  [UserState.stateKey]: UserReducer,
  [CountryState.stateKey]: country,
  [UiState.stateKey]: ui,
}
