import R from 'ramda'
import { applyReducerFunction } from '../utils/reduxUtils'
import {
  changeAssessmentStatusInitiated,
  navigationScrolled,
  toggleShowNavigation,
  toggleNavigationGroup
} from './actions'
import { assessments } from './items'

const actionHandlers = {
  [changeAssessmentStatusInitiated]: (state, action) =>
    R.assocPath(['status', 'assessments', action.assessmentType, 'status'], 'changing' ,state),
  [navigationScrolled]: (state, action) => ({...state, scrollPosition: action.position}),
  [toggleShowNavigation]: (state) => ({...state, navigationVisible: !state.navigationVisible}),
  [toggleNavigationGroup]: (state, action) => {
    const path = ['navigationGroupCollapseState', action.assessment, action.sectionNo]
    return R.assocPath(path, !R.path(path, state), state)
  }
}

const createNavigationGroupCollapseState = () => {
  const assessmentSectionPairs = R.toPairs(assessments)
  const assessmentSectionNumberPairs = R.map(
    ([assessmentName, assessmentItems]) => R.map(item => [assessmentName, item.sectionNo], assessmentItems)
    , assessmentSectionPairs
    )
  return R.reduce(
    (result, [assessmentName, sectionNo]) => R.assocPath([assessmentName, sectionNo], false, result),
    {},
    R.head(assessmentSectionNumberPairs)
  )
}

export default (state = {navigationVisible: true, navigationGroupCollapseState: createNavigationGroupCollapseState()}, action) => applyReducerFunction(actionHandlers, state, action)
