import * as R from 'ramda'
import Route from 'route-parser'

import { applyReducerFunction } from '../utils/reduxUtils'
import { routerFollowLink, routerSetCountry } from './actions'

const actionHandlers = {
  [routerFollowLink]: (state, action) => {
    const pathState = R.assoc('path', action.to)(state)

    const r = new Route('#/country/:countryIso(/)(odp*)(/)(:odpId)')
    const match = r.match(location.hash)
    if(match && match.countryIso) {
        return R.assoc('country', match.countryIso)(pathState)
    }
    return pathState
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
