import { exportReducer } from '@webapp/utils/reduxUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

import { assessmentLockUpdate, assessmentSectionPropUpdate } from '@webapp/app/assessment/actions'
import {
  assessmentSectionDataGeneratingValuesUpdate,
  assessmentSectionDataUpdate,
} from '@webapp/app/assessment/components/dataTable/actions'

const actionHandlers = {
  // ====== lock
  [assessmentLockUpdate]: (state, { assessmentType, lock }) => AssessmentState.assocLock(assessmentType, lock)(state),

  // ====== section
  [assessmentSectionPropUpdate]: (state, { assessmentType, sectionName, propName, propValue }) =>
    AssessmentState.assocSectionProp(assessmentType, sectionName, propName, propValue)(state),

  // ====== data
  [assessmentSectionDataUpdate]: (state, { assessmentType, sectionName, tableName, data }) =>
    AssessmentState.assocSectionData(assessmentType, sectionName, tableName, data)(state),

  [assessmentSectionDataGeneratingValuesUpdate]: (state, { assessmentType, sectionName, tableName, generating }) =>
    AssessmentState.assocSectionDataGeneratingValues(assessmentType, sectionName, tableName, generating)(state),
}

export default exportReducer(actionHandlers)
