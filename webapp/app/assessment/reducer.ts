import { exportReducer } from '@webapp/utils/reduxUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

import { assessmentLockUpdate, assessmentSectionPropUpdate } from '@webapp/app/assessment/actions'
import {
  assessmentSectionDataGeneratingValuesUpdate,
  assessmentSectionDataUpdate,
} from '@webapp/components/Assessment/DataTable/actions'
import { AppActions } from '@webapp/store'

const actionHandlers = {
  // ====== reset state on country update
  [AppActions.updateCountryIso.type]: () => ({}),

  // ====== lock
  [assessmentLockUpdate]: (state: any, { assessmentType, lock }: any) =>
    AssessmentState.assocLock(assessmentType, lock)(state),

  // ====== section
  [assessmentSectionPropUpdate]: (state: any, { assessmentType, sectionName, propName, propValue }: any) =>
    AssessmentState.assocSectionProp(assessmentType, sectionName, propName, propValue)(state),

  // ====== data
  [assessmentSectionDataUpdate]: (state: any, { assessmentType, sectionName, tableName, data }: any) =>
    AssessmentState.assocSectionData(assessmentType, sectionName, tableName, data)(state),

  [assessmentSectionDataGeneratingValuesUpdate]: (
    state: any,
    { assessmentType, sectionName, tableName, generating }: any
  ) => AssessmentState.assocSectionDataGeneratingValues(assessmentType, sectionName, tableName, generating)(state),
}

export default exportReducer(actionHandlers)
