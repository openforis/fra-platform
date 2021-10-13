import { UserState } from '@webapp/store/user/userStateType'
import { DataExportState } from '@webapp/store/page/dataExport'

import { LoginState } from '@webapp/store/login/loginStateType'
import { HomeState } from './page/home'
import { AppDispatch } from './store'

import { CountryState } from './country/countryStateType'

import { AppState } from './app/appStateType'

export type RootState = {
  page: {
    dataExport: DataExportState
    home: HomeState
  }
  dispatch: AppDispatch

  app: AppState
  country: CountryState
  login?: LoginState
  user: UserState
}
