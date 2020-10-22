import * as R from 'ramda'
import { exportReducer } from '@webapp/utils/reduxUtils'

import { appCountryIsoUpdate, appI18nUpdate, appInitDone } from './actions'

import * as AppState from './appState'

const actionHandlers = {
  [appInitDone]: (state, { i18n, countries, regions }) =>
    R.pipe(
      AppState.assocCountries(countries),
      AppState.assocRegions(regions),
      AppState.setAppStatusLoaded(i18n)
    )(state),

  [appCountryIsoUpdate]: (state, { countryIso, assessmentType, printView, printOnlyTablesView }) =>
    AppState.assocCountryIso(countryIso, assessmentType, printView, printOnlyTablesView)(state),

  [appI18nUpdate]: (state, { i18n }) => AppState.assocI18n(i18n)(state),
}

export default exportReducer(actionHandlers)
