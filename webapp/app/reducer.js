import * as R from 'ramda'

import {
  appCountryIsoUpdate,
} from './actions'

import { exportReducer } from '../utils/reduxUtils'

const actionHandlers = {
  [appCountryIsoUpdate]: (state, action) =>
    ({...state, countryIso: action.countryIso }),
}

export default exportReducer(actionHandlers)
