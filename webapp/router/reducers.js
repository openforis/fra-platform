import * as R from 'ramda'
import Route from 'route-parser'

import { applyReducerFunction } from '../utils/reduxUtils'
import { routerFollowLink } from './actions'

const actionHandlers = {
  [routerFollowLink]: (state, action) => {
    const pathWithoutHash = action.to ? action.to.replace(/#/gi, '') : null
    const pathState = {...state, path: pathWithoutHash}

    const r = new Route('#/country/:countryIso(/)(odp*)(/)(:odpId)')
    const match = r.match(location.hash)
    if(match && match.countryIso) {
        return R.assoc('country', match.countryIso)(pathState)
    }
    return pathState
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
