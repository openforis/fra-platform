import { exportReducer } from '@webapp/utils/reduxUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

import { assessmentLockUpdate } from '@webapp/app/assessment/actions'

const actionHandlers = {
  [assessmentLockUpdate]: (state, { assessmentType, lock }) => AssessmentState.assocLock(assessmentType, lock)(state)
}

export default exportReducer(actionHandlers)
