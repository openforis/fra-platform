import * as R from 'ramda'

import { exportReducer } from '../utils/reduxUtils'

import { localLoginResponseLoaded } from './actions'

const actionHandlers = {
  [localLoginResponseLoaded]: (state, action) =>
    R.assocPath(['localLogin', 'message'], action.message, state)
}

export default exportReducer(actionHandlers)
