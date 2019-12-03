import * as R from 'ramda'
import { applyReducerFunction } from '../utils/reduxUtils'
import {
  changeAssessmentStatusInitiated,
  navigationScrolled,
  toggleShowNavigation,
  toggleNavigationGroup,
  toggleAllNavigationGroups
} from './actions'
import { assessments } from '../../common/assessmentSectionItems'

const actionHandlers = {
  [changeAssessmentStatusInitiated]: (state, action) =>
    R.assocPath(['status', 'assessments', action.assessmentType, 'status'], 'changing', state),

  [navigationScrolled]: (state, action) => ({...state, scrollPosition: action.position}),

  [toggleShowNavigation]: (state) => ({...state, navigationVisible: !state.navigationVisible}),

  [toggleNavigationGroup]: (state, action) => {
    const path = ['navigationGroupCollapseState', action.assessment, action.sectionNo]
    return R.assocPath(path, !R.path(path, state), state)
  },

  [toggleAllNavigationGroups]: (state) => ({
    ...state,
    lastUncollapseState: !state.lastUncollapseState,
    navigationGroupCollapseState: createNavigationGroupCollapseState(!state.lastUncollapseState)
  })
}

const createNavigationGroupCollapseState = (bool = false) => {
  const assessmentSectionPairs = R.toPairs(assessments)
  const assessmentSectionNumberPairs = R.map(
    ([assessmentName, assessmentItems]) => R.map(item => [assessmentName, item.sectionNo], assessmentItems)
    , assessmentSectionPairs
  )
  return R.reduce(
    (result, [assessmentName, sectionNo]) => R.assocPath([assessmentName, sectionNo], bool, result),
    {},
    R.head(assessmentSectionNumberPairs)
  )
}

export default (state = {
  navigationVisible: true,
  lastUncollapseState: false,
  navigationGroupCollapseState: createNavigationGroupCollapseState()
}, action) => applyReducerFunction(actionHandlers, state, action)
