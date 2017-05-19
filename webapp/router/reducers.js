import * as R from "ramda"

import {applyReducerFunction} from '../utils/reduxUtils'

import {routerFollowLink} from "./actions"

console.log("router action", routerFollowLink)

const actionHandlers =  {
  [routerFollowLink]: (state, action) => {
    console.log("folowlink reducer", action)
    return R.assoc("path", action.to)(state)
  }
}


export default (state={}, action) => applyReducerFunction(actionHandlers, state, action)
