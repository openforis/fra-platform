import { getLoggedinUserInfo } from '../user/actions'
import { fetchItem } from '../tableWithOdp/actions'
import { fetchCountryOverviewStatus } from '../country/actions'
import { getCountryConfig, getCountryList } from '../country/actions'
import { fetch as fetchGrowingStock } from '../assessmentFra/growingStock/actions'

export const fetchAllCountryData = countryIso => dispatch => {
  // This got broken accidentally on dashboard route and nobody noticed, let's make
  // it damn sure that someone notices next time:
  if (!countryIso) {
    const errMsg = 'Error: No countryIso available when fetching initial data!'
    alert(errMsg)
    throw Error(errMsg)
  }
  fetchCountryOverviewStatus(countryIso)(dispatch)
  fetchItem('extentOfForest', countryIso)(dispatch)
  fetchItem('forestCharacteristics', countryIso)(dispatch)
  getCountryList()(dispatch)
  getCountryConfig(countryIso)(dispatch)
  fetchGrowingStock(countryIso)(dispatch)
}

export const fetchInitialData = (countryIso) => dispatch => {
  getLoggedinUserInfo()(dispatch)
  fetchAllCountryData(countryIso)(dispatch)
}
