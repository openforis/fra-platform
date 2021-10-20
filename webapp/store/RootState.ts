import { AppState } from '@webapp/store/app/appStateType'
import { AutosaveState } from '@webapp/store/autosave'
import { CountryState } from '@webapp/store/country/countryStateType'
import { LoginState } from '@webapp/store/login/loginStateType'
import { HomeState } from '@webapp/store/page/home'
import { DataExportState } from '@webapp/store/page/dataExport'
import { OriginalDataPointState } from '@webapp/store/page/originalDataPoint'
import { NavigationState } from '@webapp/store/navigation'
import { UserState } from '@webapp/store/user/userStateType'

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
