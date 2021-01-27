import { useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as FraState from '@webapp/app/assessment/fra/fraState'

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'assessment' implicitly has an 'any' typ... Remove this comment to see the full error message
export default (assessment = null) => {
  const state = useSelector(R.identity)

  // if argument is null, take fra2020 assessment
  return assessment ? AssessmentState.isLocked(assessment)(state) : FraState.isLocked(state)
}
