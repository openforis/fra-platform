import { useSelector } from 'react-redux'
import * as R from 'ramda'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as FraState from '@webapp/app/assessment/fra/fraState'

export default (assessment = null) => {
  const state = useSelector(R.identity)

  // if argument is null, take fra2020 assessment
  return assessment
    ? AssessmentState.isLocked(assessment)(state)
    : FraState.isLocked(state)
}
