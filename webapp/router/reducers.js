import * as R from "ramda"

import {applyReducerFunction} from '../utils/reduxUtils'

import {routerFollowLink} from "./actions"

const actionHandlers =  {
  [routerFollowLink]: (state, action) => {
    return R.assoc("path", action.to)(state)
  }
}


export default (state={}, action) => applyReducerFunction(actionHandlers, state, action)
