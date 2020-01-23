import * as AppState from './appState'

import { exportReducer } from '@webapp/utils/reduxUtils'

import { appCountryIsoUpdate } from './actions'
import { appUserLogout } from '@webapp/user/actions'
import { userInitDone } from '@webapp/user/actions'

const actionHandlers = {

  [appUserLogout]: () => ({}),

  [appCountryIsoUpdate]: (state, { countryIso }) => AppState.assocCountryIso(countryIso)(state),

  [userInitDone]: (state) => AppState.assocLoadStatus(AppState.stateLoadedKey)(state)

}

export default exportReducer(actionHandlers)
