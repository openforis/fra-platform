import applicationError from '@webapp/components/error/reducer' // Reducers available before login
import { UserReducer } from '@webapp/store/user'
import { pageReducer } from '@webapp/store/page'

import * as ApplicationErrorState from '@webapp/components/error/applicationErrorState'
import { AppReducer } from './app'
import { CountryReducer } from './country'
import { LoginReducer } from './login'

export default {
  app: AppReducer,
  [ApplicationErrorState.stateKey]: applicationError,
  country: CountryReducer,
  login: LoginReducer,
  page: pageReducer,
  user: UserReducer,
}
