import * as R from 'ramda'
import { applyReducerFunction } from '@webapp/utils/reduxUtils'

import * as NavigationState from '@webapp/loggedin/navigation/navigationState'

import {
  changeAssessmentStatusInitiated,
  navigationToggleVisible,
} from './actions'
import { assessments } from '@common/assessmentSectionItems'

const actionHandlers = {
  [changeAssessmentStatusInitiated]: (state, action) =>
    R.assocPath(['status', 'assessments', action.assessmentType, 'status'], 'changing', state),

  [navigationToggleVisible]: NavigationState.toggleVisible,
}


export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
