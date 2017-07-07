import { applyReducerFunction } from '../utils/reduxUtils'
import { listCountries, fetchNavStatusCompleted } from './actions'
import { issuePostCommentCompleted} from '../review/actions'

const actionHandlers = {
  [listCountries]: (state, action) => {
    return {...state, countries: action.countries}
  },
  [issuePostCommentCompleted]: state => {
    return {...state, updateNeeded: true}
  },
  [fetchNavStatusCompleted]: (state, action) => {
    return {...state, status: action.status}
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
