import applicationError from '@webapp/components/error/reducer' // Reducers available before login
import { UserReducer, UserState } from '@webapp/store/user'
import login from '@webapp/pages/Login/reducer'
import country from '@webapp/app/country/reducer'
import { pageReducer } from '@webapp/store/page'

import * as ApplicationErrorState from '@webapp/components/error/applicationErrorState'
import * as CountryState from '@webapp/app/country/countryState'
import { AppReducer } from './app'

export default {
  [ApplicationErrorState.stateKey]: applicationError,
  app: AppReducer,
  login,
  [UserState.stateKey]: UserReducer,
  [CountryState.stateKey]: country,
  page: pageReducer,
}
