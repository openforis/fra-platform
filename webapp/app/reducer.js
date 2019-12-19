import * as AppState from './appState'

import { exportReducer } from '../utils/reduxUtils'

import { appCountryIsoUpdate } from './actions'
import { appUserLogout } from '../user/actions'

const actionHandlers = {

  [appUserLogout]: () => ({}),

  [appCountryIsoUpdate]: (state, { countryIso }) => AppState.assocCountryIso(countryIso)(state),

}

export default exportReducer(actionHandlers)
