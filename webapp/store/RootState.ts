import { DataExportState } from './page/dataExport'
import { HomeState } from './page/home'
import { AppDispatch } from './store'
import { AppState } from './app/AppStateType'
import { CountryState } from './country/CountryStateType'

export type RootState = {
  page: {
    dataExport: DataExportState
    home: HomeState
  }
  dispatch: AppDispatch

  app: AppState
  country: CountryState
}
