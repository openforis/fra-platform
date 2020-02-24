import * as AppState from './appState'

import { exportReducer } from '@webapp/utils/reduxUtils'

import { appCountryIsoUpdate, appI18nUpdate, appInitDone } from './actions'
import { appUserLogout } from '@webapp/user/actions'

const actionHandlers = {
  [appInitDone]: (state, { i18n }) => AppState.setAppStatusLoaded(i18n)(state),

  [appCountryIsoUpdate]: (state, { countryIso }) => AppState.assocCountryIso(countryIso)(state),

  [appI18nUpdate]: (state, { i18n }) => AppState.assocI18n(i18n)(state),

  // On user logout,reset only country iso
  [appUserLogout]: AppState.assocCountryIso(null),
}

export default exportReducer(actionHandlers)
