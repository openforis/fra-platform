import { exportReducer } from '@webapp/utils/reduxUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

import { assessmentLockUpdate } from '@webapp/app/assessment/actions'
import { assessmentSectionDataUpdate } from '@webapp/app/assessment/components/dataTable/actions'

const actionHandlers = {
  [assessmentLockUpdate]: (state, { assessmentType, lock }) => AssessmentState.assocLock(assessmentType, lock)(state),

  [assessmentSectionDataUpdate]: (state, { assessmentType, sectionName, tableName, data }) => AssessmentState.assocSectionData(assessmentType, sectionName, tableName, data)(state),
}

export default exportReducer(actionHandlers)
