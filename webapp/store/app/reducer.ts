import * as R from 'ramda'
import { exportReducer } from '@webapp/utils/reduxUtils'

import { ActionTypes } from '@webapp/store/app/actions'

import * as AppState from './state'

const actionHandlers = {
  [ActionTypes.appInitDone]: (state: any, { i18n, countries, regions, regionGroups }: any) =>
    R.pipe(
      AppState.assocCountries(countries),
      AppState.assocRegions(regions),
      AppState.assocRegionGroups(regionGroups),
      AppState.setAppStatusLoaded(i18n)
    )(state),

  [ActionTypes.updateCountries]: (state: any, { countries }: any) => AppState.assocCountries(countries)(state),

  [ActionTypes.updateRegions]: (state: any, { regions }: any) => AppState.assocRegions(regions)(state),
  [ActionTypes.updateRegionGroups]: (state: any, { regionGroups }: any) =>
    AppState.assocRegionGroups(regionGroups)(state),

  [ActionTypes.appCountryIsoUpdate]: (
    state: any,
    { countryIso, assessmentType, printView, printOnlyTablesView }: any
  ) => AppState.assocCountryIso(countryIso, assessmentType, printView, printOnlyTablesView)(state),

  [ActionTypes.appI18nUpdate]: (state: any, { i18n }: any) => AppState.assocI18n(i18n)(state),
}

export default exportReducer(actionHandlers)
