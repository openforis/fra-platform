import * as R from 'ramda'
import { applyReducerFunction } from '@webapp/utils/reduxUtils'
import {
  changeAssessmentStatusInitiated,
  toggleShowNavigation,
  toggleNavigationGroup,
  toggleAllNavigationGroups
} from './actions'
import { assessments } from '@common/assessmentSectionItems'

const actionHandlers = {
  [changeAssessmentStatusInitiated]: (state, action) =>
    R.assocPath(['status', 'assessments', action.assessmentType, 'status'], 'changing', state),


  [toggleShowNavigation]: (state) => ({...state, navigationVisible: !state.navigationVisible}),

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
