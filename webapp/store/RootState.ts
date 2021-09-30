import { AppDispatch } from './store'
import { AppState } from './app/AppStateType'
import { CountryState } from './country/CountryStateType'

export type RootState = {
  dispatch: AppDispatch

  app: AppState
  country: CountryState
}
