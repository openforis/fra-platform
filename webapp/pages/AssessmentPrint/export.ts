import assessment from '@webapp/app/assessment/reducer'
import userManagement from '@webapp/app/user/userManagement/reducer'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'

import component from './AssessmentPrint'

const reducers = [
  { name: AssessmentState.stateKey, fn: assessment },
  { name: UserManagementState.stateKey, fn: userManagement },
]

export { component, reducers }
