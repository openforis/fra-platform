import applicationError from '../components/error/reducer' // Reducers available before login
import { UserReducer } from '../store/user'
import { pageReducer } from '../store/page'

import * as ApplicationErrorState from '../components/error/applicationErrorState'
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
