import { AppDispatch } from './store'
import { AppState } from './app/appStateType'
import { CountryState } from './country/countryStateType'

export type RootState = {
  dispatch: AppDispatch

  app: AppState
  country: CountryState
}
