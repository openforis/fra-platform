import * as R from 'ramda'
import * as types from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [types.uploadedQuestionareInfo]: (state, action) => ({...state, questionnaireFileName: action.data.questionnaireFileName})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
