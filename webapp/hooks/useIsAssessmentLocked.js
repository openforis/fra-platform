import { useSelector } from 'react-redux'
import * as R from 'ramda'

import { isAssessmentLocked } from '@webapp/utils/assessmentAccess'

export default (assessmentName = 'fra2020') => {
  const state = useSelector(R.identity)
  return isAssessmentLocked(state, assessmentName)
}
