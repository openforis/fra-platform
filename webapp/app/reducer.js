import * as R from 'ramda'
import { exportReducer } from '@webapp/utils/reduxUtils'

import { ActionTypes } from '@webapp/store/app/actions'

import * as AppState from './appState'

const actionHandlers = {
  [ActionTypes.appInitDone]: (state, { i18n, countries, regions, regionGroups }) =>
    R.pipe(
      AppState.assocCountries(countries),
      AppState.assocRegions(regions),
      AppState.assocRegionGroups(regionGroups),
      AppState.setAppStatusLoaded(i18n)
    )(state),

  [ActionTypes.updateCountries]: (state, { countries }) => AppState.assocCountries(countries)(state),

  [ActionTypes.updateRegions]: (state, { regions }) => AppState.assocRegions(regions)(state),
  [ActionTypes.updateRegionGroups]: (state, { regionGroups }) => AppState.assocRegionGroups(regionGroups)(state),

  [ActionTypes.appCountryIsoUpdate]: (state, { countryIso, assessmentType, printView, printOnlyTablesView }) =>
    AppState.assocCountryIso(countryIso, assessmentType, printView, printOnlyTablesView)(state),

  [ActionTypes.appI18nUpdate]: (state, { i18n }) => AppState.assocI18n(i18n)(state),
}

export default exportReducer(actionHandlers)
