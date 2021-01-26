import * as R from 'ramda'
import { exportReducer } from '@webapp/utils/reduxUtils'

import { ACTION_TYPE } from '@webapp/store/app/actions'

import { appCountryIsoUpdate, appI18nUpdate, appInitDone } from '../store/app/actions'
import * as AppState from './appState'

const actionHandlers = {
  [appInitDone]: (state, { i18n, countries, regions, regionGroups }) =>
    R.pipe(
      AppState.assocCountries(countries),
      AppState.assocRegions(regions),
      AppState.assocRegionGroups(regionGroups),
      AppState.setAppStatusLoaded(i18n)
    )(state),

  [ACTION_TYPE.updateCountries]: (state, { countries }) => AppState.assocCountries(countries)(state),

  [ACTION_TYPE.updateRegions]: (state, { regions }) => AppState.assocRegions(regions)(state),
  [ACTION_TYPE.updateRegionGroups]: (state, { regionGroups }) => AppState.assocRegionGroups(regionGroups)(state),

  [appCountryIsoUpdate]: (state, { countryIso, assessmentType, printView, printOnlyTablesView }) =>
    AppState.assocCountryIso(countryIso, assessmentType, printView, printOnlyTablesView)(state),

  [appI18nUpdate]: (state, { i18n }) => AppState.assocI18n(i18n)(state),
}

export default exportReducer(actionHandlers)
