import { UserState } from '@webapp/store/user/UserStateType'
import { DataExportState } from '@webapp/store/page/dataExport'

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
  user: UserState
}
