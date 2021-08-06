import applicationError from '@webapp/components/error/reducer' // Reducers available before login
import { UserReducer, UserState } from '@webapp/store/user'
import ui from '@webapp/store/ui/reducer'
import app from '@webapp/store/app/reducer'
import login from '@webapp/pages/Login/reducer'
import country from '@webapp/app/country/reducer'
import { pageReducer } from '@webapp/store/page'

import * as AppState from '@webapp/store/app/state'
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
  page: pageReducer,
}
