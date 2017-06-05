import * as R from 'ramda'

import { applyReducerFunction } from '../utils/reduxUtils'
import {
  issuePostCommentCompleted,
  issueRetrieveCommentsStarted,
  issueRetrieveCommentsCompleted,
  issueOpenCommentThread,
  issueCloseCommentThread
} from './actions'

const actionHandlers = {
  [issuePostCommentCompleted]: (state, action) => ({...state, 'status': action.status}),
  [issueRetrieveCommentsStarted]: (state, action) => ({...state, 'status': action.status}),
  [issueRetrieveCommentsCompleted]: (state, action) => {
    return {...state, [action.target]: action.comments}
  },
  [issueOpenCommentThread]: (state, action) => ({...state, 'openThread': action.target}),
  [issueCloseCommentThread]: (state, action) => R.omit(['openThread'], state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
