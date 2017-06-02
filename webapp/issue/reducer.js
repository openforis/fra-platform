import { applyReducerFunction } from '../utils/reduxUtils'
import {
  issuePostCommentCompleted,
  issueRetrieveCommentsStarted,
  issueRetrieveCommentsCompleted
} from './actions'

const actionHandlers = {
  [issuePostCommentCompleted]: (state, action) => {
    return ({...state, 'status': action.status})
  },
  [issueRetrieveCommentsStarted]: (state, action) => {
    return ({...state, 'status': action.status})
  },
  [issueRetrieveCommentsCompleted]: (state, action) => {
    return ({...state, 'comments': action.comments})
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
