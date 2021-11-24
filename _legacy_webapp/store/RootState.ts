import { AppState } from '../store/app/appStateType'
import { AutosaveState } from '../store/autosave'
import { CountryState } from '../store/country/countryStateType'
import { LoginState } from '../store/login/loginStateType'
import { HomeState } from '../store/page/home'
import { DataExportState } from '../store/page/dataExport'
import { OriginalDataPointState } from '../store/page/originalDataPoint'
import { NavigationState } from '../store/navigation'
import { UserState } from '../store/user/userStateType'

export type RootState = {
  app: AppState
  autosave?: AutosaveState
  country: CountryState
  login?: LoginState
  navigation: NavigationState
  page: {
    dataExport: DataExportState
    home: HomeState
    originalDataPoint: OriginalDataPointState
  }
  user: UserState
}
