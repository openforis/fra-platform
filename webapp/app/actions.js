import { getLoggedinUserInfo } from '@webapp/user/actions'
import { fetchItem } from '../tableWithOdp/actions'
import { fetchCountryOverviewStatus } from '../country/actions'
import { getCountryConfig, getCountryList } from '../country/actions'
import { fetch as fetchGrowingStock } from '@webapp/loggedin/assessmentFra/growingStock/actions'

export const appCountryIsoUpdate = 'app/countryIso/update'

export const fetchAllCountryData = countryIso => dispatch => {
  dispatch(fetchCountryOverviewStatus(countryIso))
  dispatch(fetchItem('extentOfForest', countryIso))
  dispatch(fetchItem('forestCharacteristics', countryIso))
  dispatch(getCountryList())
  dispatch(getCountryConfig(countryIso))
  dispatch(fetchGrowingStock(countryIso))
}

export const fetchInitialData = countryIso => dispatch => {
  dispatch({ type: appCountryIsoUpdate, countryIso })

  dispatch(getLoggedinUserInfo())
  dispatch(fetchAllCountryData(countryIso))
}

export const initApp = () => dispatch => dispatch(getLoggedinUserInfo())
