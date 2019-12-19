import { getLoggedinUserInfo } from '../user/actions'
import { fetchItem } from '../tableWithOdp/actions'
import { fetchCountryOverviewStatus } from '../country/actions'
import { getCountryConfig, getCountryList } from '../country/actions'
import { fetch as fetchGrowingStock } from '../assessmentFra/growingStock/actions'

export const appCountryIsoUpdate = 'app/countryIso/update'

export const fetchAllCountryData = countryIso => dispatch => {
  fetchCountryOverviewStatus(countryIso)(dispatch)
  fetchItem('extentOfForest', countryIso)(dispatch)
  fetchItem('forestCharacteristics', countryIso)(dispatch)
  getCountryList()(dispatch)
  getCountryConfig(countryIso)(dispatch)
  fetchGrowingStock(countryIso)(dispatch)
}

export const fetchInitialData = (countryIso) => dispatch => {
  dispatch({type: appCountryIsoUpdate, countryIso})
  getLoggedinUserInfo()(dispatch)
  fetchAllCountryData(countryIso)(dispatch)
}


export const initApp = () => dispatch => {
  getLoggedinUserInfo()(dispatch)
}
