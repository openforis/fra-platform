import * as R from 'ramda'
import { applyReducerFunction } from '../utils/reduxUtils'
import {issueRetrieveCommentsCompleted} from './actions'

const actionHandlers = {
  [issueRetrieveCommentsCompleted]: (state, action) => {
    console.log("in reducer", action)
    return ({...state, 'comments': action.comments})
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
