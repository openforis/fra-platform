import { exportReducer } from '@webapp/utils/reduxUtils'

import AppActionTypes from '@webapp/store/app/actions/actionTypes'

import {
  DataExportActionType,
  DataExportCountriesAction,
  DataExportSelectionAction,
} from '@webapp/store/page/dataExport/actionTypes'
import { DataExportState } from '@webapp/store/page/dataExport/state'

const initialState: DataExportState = {
  countries: [],
  selection: {},
}

const actionHandlers = {
  [AppActionTypes.appCountryIsoUpdate]: () => ({ ...initialState }),

  [DataExportActionType.countriesUpdate]: (
    state: DataExportState,
    action: DataExportCountriesAction
  ): DataExportState => ({
    ...state,
    countries: action.countries,
  }),

  [DataExportActionType.selectionUpdate]: (
    state: DataExportState,
    action: DataExportSelectionAction
  ): DataExportState => ({
    ...state,
    selection: {
      ...state.selection,
      [action.assessmentSection]: action.selection,
    },
  }),
}

export const dataExportReducer = exportReducer(actionHandlers, initialState)
