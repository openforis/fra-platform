import { DataLockState } from '@client/store/ui/dataLock'
import { SectionDataState } from '@client/store/data/section/stateType'
import { OriginalDataPointState } from './data/originalDataPoint'

import { NavigationState } from './ui/navigation/stateType'
import { AssessmentState } from './assessment/stateType'
import { LoginState } from './login/stateType'
import { UserState } from './user/stateType'

export type RootState = {
  assessment: AssessmentState
  login: LoginState
  user: UserState

  data: {
    originalDataPoint: OriginalDataPointState
    section: SectionDataState
  }

  ui: {
    navigation: NavigationState
    dataLock: DataLockState
  }
}
