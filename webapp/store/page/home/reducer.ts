import { exportReducer } from '@webapp/utils/reduxUtils'

import { HomeState } from '@webapp/store/page/home/state'
import { HomeActionType, HomeCountriesFilterActions } from '@webapp/store/page/home/actionTypes'

const actionHandlers = {
  [HomeActionType.countriesFilterUpdate]: (_state: HomeState, action: HomeCountriesFilterActions): HomeState => ({
    countriesFilter: action.countries,
  }),
}

export const homeReducer = exportReducer(actionHandlers)
