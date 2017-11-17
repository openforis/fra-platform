import R from 'ramda'
import { applyReducerFunction } from '../utils/reduxUtils'
import {
  changeAssessmentStatusInitiated,
  navigationScrolled,
  toggleShowNavigation
} from './actions'

const actionHandlers = {
  [changeAssessmentStatusInitiated]: (state, action) =>
    (R.assocPath(['status', 'assessments', action.assessmentType, 'status'], 'changing' ,state)),
  [navigationScrolled]: (state, action) => ({...state, scrollPosition: action.position}),
  [toggleShowNavigation]: (state) => ({...state, navigationVisible: !state.navigationVisible})
}

export default (state = {navigationVisible: true}, action) => applyReducerFunction(actionHandlers, state, action)
