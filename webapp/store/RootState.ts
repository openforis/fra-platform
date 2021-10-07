import { DataExportState } from '@webapp/store/page/dataExport'
import { AppDispatch } from './store'
import { AppState } from './app/appStateType'
import { CountryState } from './country/countryStateType'

export type RootState = {
  page: {
    dataExport: DataExportState
  }
  dispatch: AppDispatch

  app: AppState
  country: CountryState
}
