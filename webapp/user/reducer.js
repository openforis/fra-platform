import { userInfo, switchLanguageAction } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [userInfo]: (state, action) =>
    ({...state, userInfo: action.userInfo, i18n: action.i18n}),
  [switchLanguageAction]: (state, action) =>
    ({...state, i18n: action.i18n})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
