import { applyReducerFunction } from '../utils/reduxUtils'
import {
  listCountries,
  fetchCountryOverviewStatusCompleted,
  countryConfig,
  changeCountryConfigSetting
} from './actions'

const actionHandlers = {
  [listCountries]: (state, action) => ({...state, countries: action.countries}),
  [fetchCountryOverviewStatusCompleted]: (state, action) => ({...state, status: action.status}),
  [countryConfig]: (state, action) => ({...state, config: action.config}),
  [changeCountryConfigSetting]: (state, action) => ({...state, config: {...state.config, [action.key]: action.value}})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
