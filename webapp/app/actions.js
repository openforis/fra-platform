import { getLoggedinUserInfo } from '../user/actions'
import { fetchItem } from '../tableWithOdp/actions'
import { getCountryConfig } from '../country/actions'

export const fetchInitialData = (countryIso) => dispatch => {
  getLoggedinUserInfo()(dispatch)
  // This got broken accidentally on dashboard route and nobody noticed, let's make
  // it damn sure that someone notices next time:
  if (!countryIso) {
    const errMsg = 'Error: No countryIso available when fetching initial data!'
    alert(errMsg)
    throw Error(errMsg)
  }
  fetchItem('extentOfForest', countryIso)(dispatch)
  getCountryConfig(countryIso)(dispatch)
}
