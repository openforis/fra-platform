import { getLoggedinUserInfo } from '../user/actions'
import { fetchItem } from '../tableWithOdp/actions'

export const fetchInitialData = (countryIso) => dispatch => {
  getLoggedinUserInfo()(dispatch)
  if (countryIso) fetchItem('extentOfForest', countryIso)(dispatch)
}
