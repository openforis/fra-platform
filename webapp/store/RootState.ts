import { DataExportState } from '@webapp/store/page/dataExport'
import { AppDispatch } from './store'
import { AppState } from './app/AppStateType'
import { CountryState } from './country/CountryStateType'

export type RootState = {
  page: {
    dataExport: DataExportState
  }
  dispatch: AppDispatch

  app: AppState
  country: CountryState
}
