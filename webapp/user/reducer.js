import { userInfo } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'
import { createI18nInstance } from '../i18n/i18nFactory'

const actionHandlers = {
  [userInfo]: (state, action) => {
    const userInfo = action.userInfo
    return {...state, userInfo, i18n: createI18nInstance(userInfo.lang)}
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
