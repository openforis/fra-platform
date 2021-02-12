import { exportReducer } from '@webapp/utils/reduxUtils'
import * as HomeActions from './actions'
import * as HomeState from './state'

const actionHandlers = {
  [HomeActions.uiHomeUpdateSelectedCountries]: (state: any, { countries }: any) =>
    HomeState.assocSelectedCountries(countries)(state),
}

export default exportReducer(actionHandlers)
