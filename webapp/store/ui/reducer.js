import { exportReducer } from '@webapp/utils/reduxUtils'
import * as UiActions from './actions'
import * as UiState from './state'

const actionHandlers = {
  [UiActions.uiHomeUpdateSelectedCountries]: (state, { countries }) => UiState.assocSelectedCountries(countries)(state),
}

export default exportReducer(actionHandlers)
