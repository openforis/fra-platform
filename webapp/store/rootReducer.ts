import applicationError from '@webapp/components/error/reducer' // Reducers available before login
import { UserReducer, UserState } from '@webapp/store/user'
import login from '@webapp/pages/Login/reducer'
import { pageReducer } from '@webapp/store/page'

import * as ApplicationErrorState from '@webapp/components/error/applicationErrorState'
import { AppReducer } from './app'
import { CountryReducer } from './country'

export default {
  app: AppReducer,
  country: CountryReducer,

  login,
  [ApplicationErrorState.stateKey]: applicationError,
  [UserState.stateKey]: UserReducer,
  page: pageReducer,
}
