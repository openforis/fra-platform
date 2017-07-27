import { userInfo } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'
import R from 'ramda'
import i18n from '../i18n/i18n'

const actionHandlers = {

  [userInfo]: (state, action) => {
    const userInfo = action.userInfo

    if (R.isNil(state.userInfo) || userInfo.lang !== i18n.language)
      i18n.changeLanguage(userInfo.lang)

    return {...state, userInfo}
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
