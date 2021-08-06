import assessment from '@webapp/app/assessment/reducer'
import originalDataPoint from '@webapp/sectionSpec/fra/originalDataPoint/reducers'
import userManagement from '@webapp/app/user/userManagement/reducer'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as OriginalDataPointState from '@webapp/sectionSpec/fra/originalDataPoint/originalDataPointState'
import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'

import component from './AssessmentPrint'

const reducers = [
  { name: AssessmentState.stateKey, fn: assessment },
  { name: OriginalDataPointState.stateKey, fn: originalDataPoint },
  { name: UserManagementState.stateKey, fn: userManagement },
]

export { component, reducers }
