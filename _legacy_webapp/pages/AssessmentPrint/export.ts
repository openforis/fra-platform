import assessment from '../../app/assessment/reducer'
import userManagement from '../../app/user/userManagement/reducer'

import * as AssessmentState from '../../app/assessment/assessmentState'
import * as UserManagementState from '../../app/user/userManagement/userManagementState'

import component from './AssessmentPrint'

const reducers = [
  { name: AssessmentState.stateKey, fn: assessment },
  { name: UserManagementState.stateKey, fn: userManagement },
]

export { component, reducers }
